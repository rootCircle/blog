---
title: Automating MySQL Data Purging Our Journey to Efficient Data Management
description: Discover the ultimate guide to efficient data purging techniques for large-scale MySQL databases. Learn why we transitioned from manual purging to automated partitioning, compare different methods (Insert & Truncate, Chunk Delete, Partitioning) in detail, and understand the challenges and solutions we implemented. Our detailed analysis includes speed, data consistency, replication lag, scalability, and query performance. Perfect for database administrators and developers looking to optimize their MySQL data management and improve system performance.
keywords: Data purging, MySQL optimization, database partitioning, Insert & Truncate, Chunk Delete, replication lag reduction, data consistency, database scalability, query performance improvement, automated data management
---

# Automating MySQL Data Purging: Our Journey to Efficient Data Management

:::tip QUOTE
Simple-sounding problems can become a real pain when scaled; what works for ten users can break down spectacularly with a million.

~ Anonymous
:::

## Introduction

![Banner Image Placeholder](./data/banner.jpg)

In today's data-driven world, managing large volumes of data efficiently is paramount for maintaining optimal database performance. Being the largest consumer of MySQL within the company, we faced significant challenges with data management as our operations scaled up. Manual data purging, which was initially manageable, became increasingly labor-intensive and error-prone as data volumes grew. This blog post outlines our journey towards automating MySQL data purging, the challenges we faced, and the solutions we implemented to enhance efficiency and reliability.

## Why Purging?
Data purging became essential for us for several reasons:
- **Increased Disk Usage and Costs:** Unchecked data growth leads to increased disk usage and associated costs. Disk usage costs nearly doubled in just 6 months.
- **Pain of Manual Purge:** Manual purging processes were time-consuming and error-prone, leading to incidents that impacted system reliability.
- **Increasing Scale and Data Throughput:** As our operations scaled, the volume of data increased exponentially, necessitating more frequent and efficient data purging strategies. We were having a monthly data throughput of 6+ TBs of data and it was growing at uncontrollable pace.
- **Performance Costs:** Large volumes of unused data can degrade database performance, affecting query response times and overall system efficiency.

At end, we don't need to store data indefinitely subject to regulatory reasons, as those data were essentially logs and metadata, so purging is viable approach in our case.

## Approaches to Data Purging
We explored three primary approaches to automate data purging in our MySQL clusters:

### 1. Chunk Delete

![Chunk Delete](./data/ChunkDelete.png)
Chunk deletion involves breaking down the delete operation into smaller, manageable chunks instead of attempting to delete large volumes of data in a single transaction. This minimizes locking and reduces the risk of replication lag.

##### **Workflow:**

1. Identify the rows to be deleted based on a specified condition (e.g., rows older than a certain date).
2. Split the deletion operation into chunks, each deleting a fixed number of rows.
3. Execute the delete operation for each chunk sequentially, depending on the system's capabilities.
4. Repeat until all identified rows are deleted.

##### **Advantages:**
- **Reduced Locking:** Smaller transactions reduce the duration for which the table is locked, minimizing impact on concurrent operations.
- **Manageable Load:** Distributes the load evenly over time, preventing sudden spikes in database activity.
- **Adaptable:** This method allows for flexible deletion criteria, making it possible to adjust the criteria on which data has to be deleted, as requirements change.

##### **Disadvantages:**
- **Slow for Large Volumes:** Deleting data in chunks can be time-consuming, especially for very large datasets.
- **Complex Implementation:** Requires careful management to ensure consistency and completeness of deletions.
- **Possible Risk of Table Locks:** There is high risk of table level lock, when doing chunk delete in parallel.

##### **Implementation(Pseudocode):**
```sql
SET @row_count = 0;
REPEAT
  DELETE FROM your_table
  WHERE <condition>
  LIMIT 1000;
  SET @row_count = ROW_COUNT();
UNTIL @row_count = 0
END REPEAT;
```
This script repeats the delete operation in chunks of 1000 rows until no more rows match the condition.

### 2. INSERT & TRUNCATE

![Insert & Truncate](./data/InsertTruncate.png)

This approach involves copying the required data to a new table and then truncating the original table to remove unwanted data. This method is useful for scenarios where a significant portion of the table needs to be purged.

##### **Workflow:**
1. Create a new table with the same schema as the original table.
2. Insert the data to be retained into the new table in small chunks.
3. Truncate the original table to delete all rows.
4. Re-insert the retained data back into the original table from the new table.
5. Drop the temporary table used for the operation.

##### **Advantages:**
- **Efficiency for Large Purges:** Effective when a large percentage of the table needs to be purged.
- **Simpler Logic:** Straightforward to implement as it primarily involves data copying and truncation.

##### **Disadvantages:**
- **Non-Atomic Operation:** The process involves multiple steps, which are not atomic, leading to potential data inconsistency if interrupted.
- **Temporary Disk Usage:** Requires additional disk space for the temporary table holding the retained data.
- **Lossy:** This approach in non-locked situation will inherently ignore any UPDATE/DELETE done in between copy op, losing on data integrity.
- **Replication Lag:** During manual purges we observed replication lag of more than 20~30 minutes between master and slave nodes, during purge, significantly affecting data consistency.

##### **Implementation(Pseudocode):**

:::warning INFO
Ignoring the edge cases when data was inserted between copy for brevity!
:::

```sql
CREATE TABLE new_table LIKE your_table;

--- Copy in small chunks if data volume is high
INSERT INTO new_table SELECT * FROM your_table WHERE <condition>;
TRUNCATE TABLE your_table;
INSERT INTO your_table SELECT * FROM new_table;
DROP TABLE new_table;
```
This script transfers data, truncates the original table, and then reinserts the retained data.

#### 3. Partitioning

![Partitioning Approach](./data/PartitionPurge.png)

Partitioning involves dividing a table into smaller, more manageable partitions based on a specified column, such as an ID or a DateTime column. This allows for efficient purging by dropping entire partitions instead of deleting individual rows.

##### **Workflow:**
1. Modify the table schema to include partitioning based on a chosen column. (Not required, if partitioning based on PRIMARY KEY)
2. Create partitions to divide the table data according to the partition key.
3. For purging, drop partitions that contain no new data far from the retention period.
4. Create additional empty partitions to accommodate future data.

##### **Advantages:**
- **Efficiency:** Dropping partitions is faster and more efficient than row-by-row deletion.
- **Atomic Operation:** Partition operations are atomic, ensuring data consistency & integrity.
- **Minimal Replication Lag:** Significantly reduces replication lag during purging. (in order of ms)

##### **Disadvantages:**
- **Schema Changes:** Requires altering the table schema to introduce partitioning if using datetime column, as  
- **Complexity in Management:** Needs careful management of partition keys and partition lifecycle.
- **Potential issues with JOIN queries:** While benchmarking we saw 60x slower queries performance on selected queries having JOINs, while it resolved with a simple `ANALYZE TABLE` on the partitioned table, but this needed more diagnosis.

##### **Implementation:**
```sql
ALTER TABLE your_table
PARTITION BY RANGE (PRIMARY KEY) (
  PARTITION p0 VALUES LESS THAN (1000000),
  PARTITION p1 VALUES LESS THAN (2000000),
  ...
);

-- For purging (if p0 is expired)
ALTER TABLE your_table DROP PARTITION p0;
```
This script sets up partitioning based on a primary key column and drops partitions as needed.

### Summary

| Criteria            | Insert & Truncate                                      | Chunk Delete                                             | Partitioning                                             |
|---------------------|--------------------------------------------------------|----------------------------------------------------------|----------------------------------------------------------|
| **Speed**           | Moderate to Slow (2-3 hrs on 1 TB table)                                       | Slow                                                     | Blazingly Fast                                                     |
|                     | Requires copying and renaming tables, which can be time-consuming for large datasets. | Deletes data in chunks, leading to slower overall process. | Drops entire partitions quickly, minimizing time required. |
| **Data Consistency**| Can cause issues if data is updated during the process | Ensures data consistency, but the process is slower       | Ensures high consistency by dropping entire partitions atomically |
| **Replication Lag** | High replication lag                                   | Moderate replication lag                                  | Minimal replication lag                                  |
|                     | Significant lag due to large-scale data copying.       | Moderate lag as it deletes data in smaller chunks.        | Minimal lag since partitions are dropped swiftly.        |
| **Implementation Complexity**| Moderate to High                                | Moderate                                                 | High                                                     |
|                     | Needs handling of table renames and potential downtime | Requires careful management of chunk sizes and deletion intervals. | Requires schema changes, partition management, and complex setup. |
| **Scalability**     | Limited                                                | Limited to Moderate                                       | High                                                     |
|                     | Not suitable for very large datasets due to performance issues. | Can become inefficient with very large datasets.          | Scales well with very large datasets.                    |
| **Flexibility**     | High                                                   | High                                                     | Low to Moderate                                          |
|                     | Flexible deletion criteria based on TTL and other factors. | Flexible with fine-grained control over deletion.        | Less flexible due to partition constraints and requirements. |
| **Downtime Requirement**| Potential for significant downtime                 | Minimal downtime, but longer overall process              | Minimal to no downtime                                   |
|                     | Requires downtime for large-scale data copying.        | Deletes data live on the table, requiring minimal downtime. | Partitions can be managed with minimal impact on live operations. |
| **Table Lock Requirement**| May require lock, depending on implementation    | No table lock required                                    | No table lock required                                   |
|                     | Lock may be required during the renaming process.      | Deletes data in chunks without locking the entire table.  | Drops partitions without locking the entire table.       |
| **Query Performance**| No significant impact                                 | No significant impact                                     | Potential adverse impact, especially with joins          |
| **Ease of Monitoring & Debugging**| Moderate                                   | Moderate to High                                          | Moderate to High                                         |
|                     | Needs careful monitoring during copying and renaming.  | Requires detailed monitoring to ensure chunk deletions are processed correctly. | Requires monitoring of partition states and potential performance impacts. |
| **Suitability for Large Data Sets**| Limited                                   | Limited                                                  | High                                                     |
|                     | Performance issues with very large tables.             | Can be inefficient with high volumes of data.            | Designed to handle large volumes of data efficiently.    |

### Why we preffered Partitioning?

We prefer partitioning due to its efficiency and reliability in handling large datasets. Here’s why I believe it’s the best approach:

- **Fast and Atomic:** Dropping partitions is significantly faster and ensures atomic operations, maintaining data consistency.
- **Minimal Impact on Live Systems:** It reduces replication lag and avoids locking the entire table, ensuring smooth database operations.
- **Scalability:** Partitioning efficiently manages large datasets, making it suitable for our scale of operations.

### Why Partitioning for Archival?

While partitioning is often used for performance optimization, our primary goal was efficient archival. Dropping partitions is much faster than row-by-row deletion, making it ideal for removing large volumes of old data quickly and efficiently.

### Migrating Non-Partitioned Table to Partition Table

To implement partitioning, we needed to migrate our existing non-partitioned tables to partitioned tables. This process presented several challenges.

#### Pain Points with Migration
- **Scale:** Migrating large tables to a partitioned schema presented significant challenges.
- **Live Data:** Ensuring minimal or no downtime during migration was critical to avoid impacting live operations.
- **Schema Changes:** Implementing partitioning required schema modifications, which needed to be handled carefully to avoid disruptions.
- **Lengthy process:** To account for replication lag, we intentionally have to keep this process slow for a reason, which can be a pain!

#### How We Migrated
To overcome these challenges, we adopted the following strategies:

- **Using ID as Partition Column:** Instead of using a DateTime column, we used the ID column as the partition key. This avoided the need for extensive schema changes and leveraged the primary key for efficient partitioning.
- **Minimal Downtime:** We developed a automated pipeline to handle the migration process in stages, ensuring minimal impact on live systems.
- **Minimal Labor:** The amount of Labor with Migration was paramount, so we developed a automated pipeline to automated migration! One only need to put the config in YAML and pipeline will automatically pick it up and migrate it using "INSERT & TRUNCATE" approach, accounting for edge cases as well. We ensured that read miss of hot data is minimal to extent that it can be safely ignored!  

### How We Migrated
Migrating our non-partitioned tables to partitioned tables required a carefully planned approach to minimize downtime and ensure data consistency. Here is a detailed breakdown of the process:

1. **Choosing the Partition Column:**
   - Initially, we considered using the DateTime column for partitioning. However, this required significant schema changes and was expensive to implement. 
   - Hence, we opted to use the ID column instead. The ID column, typically the primary key, did not require extensive schema modifications and facilitated a smoother transition.

2. **Creating Partitioned Tables:**
   - We created new tables with partitions based on the ID column. This involved defining the partitioning scheme and ensuring that the partitioning column had unique keys.
   - We ensured that indexes and necessary constraints were replicated in the new partitioned tables.

3. **Data Migration:**
   - Data migration was done in chunks to minimize the impact on live operations. We copied data from the non-partitioned tables to the new partitioned tables in batches using "INSERT & TRUNCATE" approach.
   - During this process, we maintained data consistency by ensuring that ongoing write operations to the old tables were also reflected in the new tables.

4. **Validation:**
   - After migrating the data, we validated the new partitioned tables to ensure data integrity and consistency.
   - This involved running consistency checks and comparing row counts between the old and new tables.

5. **Switchover:**
   - Once validation was complete, we performed the switchover. This involved renaming the old tables to a backup name and renaming the new partitioned tables to the original table names and ultimately dropping the old table.

6. **Post-Migration Steps:**
   - After the switchover, we monitored the performance and behavior of the new partitioned tables to ensure everything was functioning as expected.
   - We also set up appropriate monitoring and alerting for the new partitioned tables.

### The Nitpicks
Despite partitioning being our primary approach, we also needed an archival purge method for edge cases. This involved using insert & truncate or chunk delete depending on the volume of data to be purged. We preffered archival purge when we couldn't predict query performance on partitioned table or we couldn't bear the schemas changes on the table.

1. **Archival Purge:**
   - For smaller deletions, chunk delete was more efficient. We deleted data in small chunks iteratively to avoid locking the entire table.
   - For larger deletions, insert & truncate was more appropriate. We copied the required data to a new table and truncated the old table. This method, while requiring significant downtime, was effective for handling large deletions.

2. **Choosing the Right Approach:**
   - The decision between chunk delete and insert & truncate was based on the percentage of data to be deleted. If the data to be deleted was less than 20% of the total rows, chunk delete was used. For larger deletions, insert & truncate was the chosen method.

3. **Ensuring Data Consistency:**
   - During repeated runs of the pipeline, we ensured data consistency by intelligently choosing between the different approaches based on the size of the data to be purged.
   - This helped in maintaining the reliability of the system and preventing any data loss.

### Why We Didn't Use Tools like pt-archiver and Maatkit

While considering different approaches to automate data purging, we evaluated existing tools like **pt-archiver** and **Maatkit** (now integrated into Percona Toolkit). These tools are widely used for archiving and purging data in MySQL databases, providing granular control and monitoring capabilities. However, there were several reasons we decided not to use them:

1. **Scalability:**  
Our database handles millions of rows daily and terabytes of data. Pt-archiver and Maatkit, while effective for smaller datasets, may not scale efficiently to our needs.

2. **Complexity:**  
Configuring these tools to meet our requirements involves complex setups, increasing the risk of misconfigurations and debugging challenges.

3. **Monitoring and Debugging:**  
We needed more granular monitoring and easier debugging than pt-archiver and Maatkit offer. Our custom solution provides detailed logging, alerting, and metrics specific to our needs.

4. **Custom Requirements:**  
Our custom solution allows flexible deletion strategies and incorporates specific business logic, which would be complex and inefficient to implement with third-party tools.

## Results
The implementation of automated data purging yielded significant improvements:
- **60x Decrease in Replication Lag:** The replication lag during purging operations was drastically reduced, ensuring smoother database operations.
- **Terabytes of Disk Freed:** Efficient purging freed up substantial disk space, optimizing storage utilization and reducing costs.
- **Time Saved:** Automated purging saves approximately 90+ hours annualy, previously spent on manual processes.

## Conclusion
Automating MySQL data purging transformed our data management practices, enhancing efficiency, reliability, and scalability. By adopting partitioning and addressing edge cases with hybrid approaches, we achieved significant operational improvements. This journey underscores the importance of continuously evolving data management strategies to keep pace with growing data volumes and operational demands.

## Good Reads

1. https://mysql.rjweb.org/doc.php/partitionmaint
2. https://mysql.rjweb.org/doc.php/deletebig
3. https://docs.percona.com/percona-toolkit/pt-archiver.html
