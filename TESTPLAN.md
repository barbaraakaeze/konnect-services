Take Home Exercise Test Plan

Below is a subset of our API and all relevant endpoints that have been implemented as part of this exercise.

API Call Action![](Aspose.Words.c2066d6f-1df0-4b84-a30a-73a554f2f5e0.001.png)

GET /services List all Konnect services ![](Aspose.Words.c2066d6f-1df0-4b84-a30a-73a554f2f5e0.001.png)GET /services/search/{name} Get service by name ![](Aspose.Words.c2066d6f-1df0-4b84-a30a-73a554f2f5e0.001.png)GET /services/{id} Get service by ID ![](Aspose.Words.c2066d6f-1df0-4b84-a30a-73a554f2f5e0.001.png)POST /services Create a new service DELETE /services/{id}![](Aspose.Words.c2066d6f-1df0-4b84-a30a-73a554f2f5e0.001.png) Delete Konnect service ![](Aspose.Words.c2066d6f-1df0-4b84-a30a-73a554f2f5e0.001.png)PATCH /services/{id} Update Konnect service



|**#**|**Test Scenario**|**Test Action Category**|**Description**|
| - | - | :-: | - |
||**Basic positive tests (happy paths)**|||
|1|Execute API call with valid required parameters|Validate status code|All valid requests should return 2XX HTTP status code|


||||<p>**200** OK for GET requests</p><p>**201** for POST requests creating a new service</p><p>**200** for PUT request to update existing service</p><p>**200** for a DELETE operation</p>|
| :- | :- | :- | - |
|||Validate payload|<p>1. Response is a well-formed JSON object</p><p>2. Response structure is according to data model (schema validation: field names and field types are as expected, including nested objects; field values are as expected; non-nullable fields are not null, etc.) Sample response:</p><p>[</p><p>{</p><p>"name": "Locate Users",</p><p>"description": "Change Up users iaculis metus eu ipsum lobortis, fermentum sollicitudin arcu ultricies.",</p><p>"id": "feeb2809-0a14-48f5-b489-1 4bd95fdc145",</p><p>"createdAt": "2022-10-21T18:06:03.115Z" ,</p><p>"updatedAt": "2022-10-21T18:06:03.115Z" ,</p><p>"versions": 1</p><p>}</p><p>]</p>|
|||Validate headers|<p>Verify that HTTP headers includes: content-type and other standard header fields – according to spec.</p><p>Verify that information is NOT leaked via headers.</p>|


|||Performance sanity|Response is received in a timely manner (< 100ms)|
| :- | :- | :- | :- |
||**Negative testing – valid input**|||
||<p>Execute API calls with valid input that attempts illegal operations. i.e.:</p><p>– Attempting to create a resource with no service name/description</p>||<p>{</p><p>"statusCode": 400,</p><p>"message": [</p><p>"name should not be empty", "name must be a string"</p><p>],</p><p>"error": "Bad Request"</p><p>}</p>|
||– Attempting to delete a service that doesn’t exist||500 Internal server error|
||– Attempting to update a resource with illegal valid data||<p>{</p><p>"statusCode": 400,</p><p>"message": “Bad Request Service ${id} cannot be found”,</p><p>"error": “Bad Request"</p><p>}</p>|

