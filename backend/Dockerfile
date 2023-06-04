# Eclipse JRE 19 Base Image
FROM eclipse-temurin:19.0.2_7-jre

# Find the JAR file
ARG JAR_FILE=target/*.jar

# Copy the JAR file
COPY ${JAR_FILE} app.jar

# Establish the environment variables
ENV DB_URL=
ENV DB_USERNAME=
ENV DB_PASSWORD=

# Run the JAR file
ENTRYPOINT java -Dspring.datasource.url=$DB_URL -Dspring.datasource.username=$DB_USERNAME -Dspring.datasource.password=$DB_PASSWORD -jar /app.jar
