# Group "Labs-aexo"

## Members

- s339144 SANAEE  POOR SIAVASH
- s346279 TAVAKOLI PARSA
- s339414 BAVIFARD ALI
- s340808 RANJBAR AMIRHOSSEIN
- s338312 ARMAN HOMAFAR

# Exercise "Meme Game"

# Lab Journal

(you may update this file to keep track of the progress of your group work, throughout the weeks)


# API documentation:

# Meme API Documentation

## 1. Retrieve All Memes

**HTTP Method:** GET  
**Endpoint URL:** `/api/memes`

**Description:**  
Retrieves a list of all meme items in the database.

**Sample Request:**
GET /api/memes HTTP/1.1 Host: yourserver.com Content-Type: application/json


**Sample Response:**
```json
[
  {
    "id": 1,
    "imageUrl": "https://example.com/meme1.jpg"
  },
  {
    "id": 2,
    "imageUrl": "https://example.com/meme2.jpg"
  }
]
Error Responses:

500 Internal Server Error – Returned if an error occurs while retrieving the data.




## 2-Retrieve Memes with Specific Characteristics
Description: Retrieves memes with an id greater than the specified minId value.

GET /api/memes?minId=1 HTTP/1.1
Host: yourserver.com
Content-Type: application/json

[
  {
    "id": 2,
    "imageUrl": "https://example.com/meme2.jpg"
  },
  {
    "id": 3,
    "imageUrl": "https://example.com/meme3.jpg"
  }
]


Error Responses:

400 Bad Request – If the minId parameter is invalid.

500 Internal Server Error – If an error occurs while processing the request.


## 3. Retrieve a Specific Meme
Sample Request:

GET /api/memes/1 HTTP/1.1
Host: yourserver.com
Content-Type: application/json


Sample Response:

json
{
  "id": 1,
  "imageUrl": "https://example.com/meme1.jpg"
}

Error Responses:

400 Bad Request – If the provided id is invalid.

404 Not Found – If no meme exists with the specified id.

500 Internal Server Error – If an error occurs during retrieval.


4. Create a New Meme

HTTP Method: POST Endpoint URL: /api/memes

Description: Creates a new meme in the database. The server automatically assigns a unique id.

Request Body:

json
{
  "imageUrl": "https://example.com/newMeme.jpg"
}
Sample Response:

json
{
  "id": 4,
  "imageUrl": "https://example.com/newMeme.jpg"
}
Error Responses:

400 Bad Request – If the imageUrl field is missing from the request body.

500 Internal Server Error – If an error occurs while creating the meme.


5.Update an Existing Meme (Full Update)
HTTP Method: PUT Endpoint URL: /api/memes/{id}

Description: Fully updates an existing meme’s information. All properties (except id) must be provided in the payload.

Parameters:

id (URL Parameter, integer): The unique identifier of the meme to update.

Request Body:

json
{
  "imageUrl": "https://example.com/updatedMeme.jpg"
}
Sample Response:

json
{
  "message": "Meme updated successfully.",
  "id": 1,
  "imageUrl": "https://example.com/updatedMeme.jpg"
}
Error Responses:

400 Bad Request – If the id is invalid or the request body is missing required fields.

404 Not Found – If no meme exists with the provided id.

500 Internal Server Error – If an error occurs during the update.


6.Delete an Existing Meme
HTTP Method: DELETE Endpoint URL: /api/memes/{id}

Description: Deletes a meme from the database using its unique identifier.

Parameters:

id (URL Parameter, integer): The unique identifier of the meme to be deleted.

Sample Request:

DELETE /api/memes/1 HTTP/1.1
Host: yourserver.com
Content-Type: application/json
Sample Response:

json
{
  "message": "Meme deleted successfully.",
  "id": 1
}
Error Responses:

400 Bad Request – If the provided id is invalid.

404 Not Found – If no meme exists with the specified id.

500 Internal Server Error – If an error occurs during deletion.






