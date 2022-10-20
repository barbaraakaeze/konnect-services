This program allows a user to see an overview of services in an organization. The user can:

1. See the name, a brief description, and versions available for a given service
2. Navigate to a given service using the ID
3. Search for a specific service using the service name

# Quick STEPS

- Start services `docker compose up`
- Seed the database `./scripts/seed_test_data.sh`
- From a terminal run `npm run start:dev`
- When testing is complete, stop running DB `docker compose down`

# Query Services
## Get all services
From Postman make a GET request to `http://localhost:3000/api/service`
## Get a service
From Postman make a GET request to `http://localhost:3000/api/service/:id`
## Fetch a service versions
From Postman make a GET request to `http://localhost:3000/api/service/versions/:id` the id will be the id of the service which versions you would like to see.
## Search a service
From Postman make a GET request to `http://localhost:3000/api/service/search/:name` the name will be the name of the specific service being searched.

# CRUD functionalities
Create GET request to `http://localhost:3000/api/service/:id`
Read GET request to `http://localhost:3000/api/service`
Update PATCH request to `http://localhost:3000/api/service/:id`
Delete DELETE request to `http://localhost:3000/api/service/:id`

## Debugging DB issues
- Start services `docker compose up`
- Start migration `./scripts/seed_test_data.sh`
- View data in db `docker exec -it ${CONTAINER_ID} psql -U konnectservices`
- List databases ` \l`
- List tables `\dt`
- Stop running DB `docker compose down`

# Considerations
With more time, I would have:

*Database:* Index the ID column for faster searches

*Pagination:* Implemented cursor based pagination using the [typeorm-cursor-pagination](https://www.npmjs.com/package/typeorm-cursor-pagination/v/0.6.1)

*Unit Tests*: Added some unit test to test the core requirements. Some edge case tests to ensure we capture corner cases and error handling.


