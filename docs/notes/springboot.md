# SpringNotes

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

1. @Entity -> TABLE SCHEMA, @Id @GeneratedValue(strategy=GenerationType.AUTO)
2. Respository -> interface to Respository extends CrudRepository<User, Integer> {}
3. Controller -> 
    ``` java
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

- If you use Gradle, you can run the application by using `./gradlew` bootRun.
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
