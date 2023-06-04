# Al Gorceries

For people how love but do not always know what to cook.

## How to run
### Development

- Clone the repository
- Set up a postgres database
- Create tables using the `backend/db/create.sql` file
- Connect the spring boot backend to the database (properties or environment variables)
- Run `npm install` in the frontend folder
- Run `npm start` in the frontend folder
- Start the spring boot backend

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
docker run -p 8080:8080 --name al-gorceries-backend --network al-gorceries-network -e DB_URL=jdbc:postgresql://al-gorceries-postgres:5432/[USER] -e DB_USERNAME=[USER] -e DB_PASSWORD=[PASSWORD] yustheyokai/al-gorceries-backend
```

Create a frontend container:

```cmd
docker run -p 80:80 --name al-gorceries-frontend --network al-gorceries-network yustheyokai/al-gorceries-frontend
```
