# URL Shortener Service

> API to create short urls using Node, Express and MongoDB

## Quick Start

```bash
# Install dependencies
npm install

# Edit the default.json file with your mongoURI and baseUrl
# Use production.json in production env

# Run
npm start
```
## Endpoint to authenticate

### POST api/auth/register
{ 
   "username": "xxxx",
   "password": "xxxx"
}

### POST api/auth/login 
{ 
   "username": "xxxx",
   "password": "xxxx"
}

## Endpoint to create short url

### POST api/url/shorten

{ "longUrl": "xxxx" }

## Endpoint to redirect

### GET api/redirect/:urlCode

## Endpoint to update the longUrl and delete the shortUrl assocaited with that id.

### PUT api/url/update/:id(objectID from mongoDB)

{ "longUrl":"updated URL" }

## Endpoint to Create Custom Shorten URL

### POST api/url/url/customShorten
{ 
   "longUrl": "xxxxxx",
   "customShort": "custom"
}

>Similary you will find all the defined URL's endpoint in the postman collection in the folder. I have included the POSTMAN collection with the specified request order. To check the complete functionality and each endpoints. Please import the collection in your postman and make each request after running the application.
>This was really a fun assignment and I have added couple of things like JWT authentication and dockerfile to dockerize the application from my side as it the standart mostly and I really like development.
>Also the instruction to run and install the assignment are given above.
>Apart from that I have use mongoDb as a database to manage the data in the assignment. 
>Note: Please ensure to run a mongodb client in your local machine to make the assigment database work.

Note : Please ensure to register a user and login it to access the all authenticated endpoints.
>Thank You! 