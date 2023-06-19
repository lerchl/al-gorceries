# Al Gorceries
## How to run
### Development

- Clone the repository
- Set up a postgres database
- Connect the spring boot backend to the database (properties or environment variables)
- Start the spring boot backend
- Run `npm install` in the frontend folder
- Run `npm start` in the frontend folder

### Production

The frontend image is missing configuration for the backend url. This will follow soon. This docker guide, as of now, only supports my production case.

Create a network for the containers to communicate:

```cmd
docker network create al-gorceries-network
```

Create a postgres container:

```cmd
docker run -p 5432:5432 --name al-gorceries-postgres --network al-gorceries-network -e POSTGRES_PASSWORD=[PASSWORD] -e POSTGRES_USER=[USER] -d postgres
```

Create a backend container:

```cmd
docker run -p 8080:8080 --name al-gorceries-backend --network al-gorceries-network -e DB_URL=jdbc:postgresql://al-gorceries-postgres:5432/[USER] -e DB_USERNAME=[USER] -e DB_PASSWORD=[PASSWORD] -e PEPPER=[PEPPER] -d yustheyokai/al-gorceries-backend
```

Create a frontend container:

```cmd
docker run -p 80:80 --name al-gorceries-frontend --network al-gorceries-network -d yustheyokai/al-gorceries-frontend
```
