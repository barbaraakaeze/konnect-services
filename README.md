This program allows a user to see an overview of services in an organization. The user can:

1. See the name, a brief description, and versions available for a given service
2. Navigate to a given service using the ID
3. Search for a specific service using the service name

    3b. A method to retrieve version for specific service.

**Additional functionalities:**

1. Update a service name, description and version
2. Delete a service
3. Sort, filter and paginate results

# Quick startup steps

- Start services `docker compose up`
- Seed the database `./scripts/seed_test_data.sh`
- From a terminal run `npm run start:dev`
- When testing is complete, stop running DB `docker compose down`

# Query Services
## Get all services
From Postman make a GET request to `http://localhost:3000/api/services`

## Get a service
From Postman make a GET request to `http://localhost:3000/api/services/:id`
## Search a service
From Postman make a GET request to `http://localhost:3000/api/services/search/:name` the name will be the name of the specific service being searched.

### Fetch a service versions
From Postman make a GET request to `http://localhost:3000/api/services/versions/:id` the id will be the id of the service which versions you would like to see.
## Sorting, Filtering and Pagination
From Postman make a request with sorting, pagination and/or filtering GET request to `http://localhost:3000/api/services?sort=ASC&limit=12&page=1`
# CRUD functionalities
Create: POST request to `http://localhost:3000/api/services/:id`

Read: GET request to `http://localhost:3000/api/services`

Update: PATCH request to `http://localhost:3000/api/services/:id`

Delete: DELETE request to `http://localhost:3000/api/services/:id`

## Debugging DB issues
- Start services `docker compose up`
- Start migration `./scripts/seed_test_data.sh`
- View data in db `docker exec -it ${CONTAINER_ID} psql -U konnectservices`
- List databases ` \l`
- List tables `\dt`
- Return items in table `SELECT * FROM services;`
- Stop running DB `docker compose down`

# Test Plan:
[Test Plan 01](https://github.com/barbaraakaeze/konnect-services/blob/main/test/Test%20Plan-images/0001.jpg)

[Test Plan 02](https://github.com/barbaraakaeze/konnect-services/blob/main/test/Test%20Plan-images/0002.jpg)

[Test Plan 03](https://github.com/barbaraakaeze/konnect-services/blob/main/test/Test%20Plan-images/0003.jpg)


# Considerations and Assumptions
I assumed the versioning entity request does not require the user to query and view every version of a service. Rather, we view how many version exist for a service.

With more time, I would have:

*Database:* Index the ID column for faster searches. Added a tag to the database to handle searches by Query param.

*Pagination:* Implemented cursor based pagination using the [typeorm-cursor-pagination](https://www.npmjs.com/package/typeorm-cursor-pagination/v/0.6.1)

*Unit Tests*: Added some unit test to test the core requirements. Some edge case tests to ensure we capture corner cases and error handling.

*Documentation*: Document API endpoints using ` @nestjs/swagger swagger-ui-express`. Considering the size of this project, this was not a priority.


