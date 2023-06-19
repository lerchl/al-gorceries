FROM maven:3.9.2-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy the source code and pom.xml
COPY ./pom.xml ./
COPY ./src ./src

# Build the JAR file
RUN mvn package -DskipTests

# Eclipse JRE 17 Base Image
FROM eclipse-temurin:17.0.7_7-jre

# Copy the JAR file
COPY --from=builder /app/target/*.jar ./app.jar

# Establish the environment variables
ENV DB_URL=
ENV DB_USERNAME=
ENV DB_PASSWORD=
ENV PEPPER=peppery

# Run the JAR file
ENTRYPOINT java -Dspring.datasource.url=$DB_URL -Dspring.datasource.username=$DB_USERNAME -Dspring.datasource.password=$DB_PASSWORD -Dauthentication.pepper=$PEPPER -jar app.jar
