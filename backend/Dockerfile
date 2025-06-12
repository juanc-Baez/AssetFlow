# Dockerfile para el backend Spring Boot
FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY target/crudEmp-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
