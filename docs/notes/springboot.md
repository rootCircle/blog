---
title: SpringBoot Notes
description: Springboot cheatsheet 
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://download.logo.wine/logo/Spring_Framework/Spring_Framework-Logo.wine.png
  - - meta
    - name: twitter:card
      content: summary_large_image
---
# SpringNotes

Intended for spring-boot integration with mysql.

## Initial Steps

``` bash
sudo mariadb -u root -p
```

``` bash
mysql> create database db_example;
mysql> create user 'springuser'@'%' identified by '1234';
mysql> grant all on db_example.* to 'springuser'@'%';
```

## application.properties

``` toml
spring.jpa.hibernate.ddl-auto=[none|update|create|create-drop]
```

- none: The default for MySQL. No change is made to the database structure.
- update: Hibernate changes the database according to the given entity structures.
- create: Creates the database every time but does not drop it on close.
- create-drop: Creates the database and drops it when SessionFactory closes.

In production, set this to none, revoke all privileges from the MySQL user
connected to the Spring application, and give the MySQL user only SELECT,
UPDATE, INSERT, and DELETE.

1. @Entity ->

    ``` java
     // UserModel
    @Entity
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    
    // In validation dependencies by jakarta
    @NotNull
    @Size(min=2, max=12)
    ```

    We can also create, toString() method in User Model.
2. Respository -> interface to Respository extends CrudRepository<User, Integer>
                  {}
3. Controller ->

    ``` java
    @RestController // Using RestController instead of Controller
    // means ResponseBody need not to be used
    @Controller @RequestMapping(path="/api/v1"), @Autowired private userrepo;
    public @ResponseBody String fx(@RequestParam String name) {
        userRepository.save(user_object)
        // saved
    }
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
    ```

4. Main -> @SpringBootApplication

## Building an executable

- If you use Gradle, you can run the application by using `./gradlew bootRun`.
  Alternatively, you can build the JAR file by using `./gradlew build` and
  then run the JAR file, as follows:

    ``` bash
    java -jar build/libs/gs-accessing-data-mysql-0.1.0.jar
    ```

- If you use Maven, you can run the application by using `./mvnw spring-boot:run`.
  Alternatively, you can build the JAR file with `./mvnw clean package` and
  then run the JAR file, as follows:

    ``` bash
    java -jar target/gs-accessing-data-mysql-0.1.0.jar
    ```

## Testing using CURL

``` bash
curl -X POST http://localhost:8080/demo/add\ 
    -d name=First -d email=someemail@someemailprovider.com #POST
curl -X GET http://localhost:8080/demo/all # GET
```

``` bash
curl -i -H "Content-Type:application/json"\ 
    -d '{"firstName": "Frodo", "lastName": "Baggins"}' \
    http://localhost:8080/people
```

- -i: Ensures you can see the response message including the headers.
- -H "Content-Type:application/json": Sets the content type so the application
                                      knows the payload contains a JSON object.

``` bash
curl -i -X POST -H "Content-Type: multipart/form-data" 
-F "data=@test.mp3" http://mysuperserver/media/1234/upload/
```

- -F/--form <name=content> Specify HTTP multipart POST data (H)

## Security

While in production, we should give granular API access to the `springuser`.

``` bash
mysql> revoke all on db_example.* from 'springuser'@'%';
mysql> grant select, insert, delete, update on db_example.* to 'springuser'@'%';
```

Change the spring.jpa.hibernate.ddl-auto to update.

## Find by name

In UserRepository, creating a function that finds user by name,
findAll, findById is implemented by default

``` java
public interface UserRepository extends CrudRepository<User, Integer>, PagingAndSortingRepository<User, Integer> {
    public Iterable<User> findByName(@Param("name") String name);
}
```

PagingAndSortingRepository and CrudRepository provides a set of pre-baked tools
like `findAll`, `deleteById` to name a few.

## File Upload

## File Upload Limits

``` toml
spring.servlet.multipart.max-file-size=128KB
spring.servlet.multipart.max-request-size=128KB
```

## Reference

- [SpringBoot Docs](https://spring.io/guides#gettingStarted)

## Useful Links

- [Validating Form Server Side](https://spring.io/guides/gs/validating-form-input/)
- [Maven](https://spring.io/guides/gs/maven/)
- [Uploading Files](https://spring.io/guides/gs/uploading-files/)
- [CRUD with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
