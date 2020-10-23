# rh-gc-api
nodejs google cloud function api for runninghill recruitment

* The files in the root of this repo were used to test the nodeJS REST API with express routes to a local MongoDB instance, by running the nodejs code using the command node app.js and calling endpoints with curl as described below.

* I subsequently moved the code to Google Cloud functions and MongoDB Atlas also hosted on google cloud. 

* MongoDB collections can be imported to MongoDB Atlas once you've created a free cluster at https://www.mongodb.com/cloud/atlas/register

* Google cloud function source code is contained in function-source.zip and extracted to function-source/. You can upload the zip to google cloud console to run the api without auth. TODO: add auth

* Cloud function source code doesn't need express, the REST methods are abstracted to a parameter in the request body and I control the update logic at the level of  the MongoDB driver, and it works with post or get requests

* MongoDB collections are stored in mongo-data/

* To test get requests for retrieving values: curl -X POST -H "Content-Type: application/json" --data '{"database": "<database_name>","collection": "<collection_name>","method": "get"}' https://europe-west2-runninghill.cloudfunctions.net/nodejs-mongodb-atlas-api

* To test put requests for updating existing values: curl -X POST -H "Content-Type: application/json" --data '{"database": "<database_name>","collection": "<collection_name>","method": "put","item":{"value":"<updated_value>"},"itemId":"<value_to_be_updated>"}' https://europe-west2-runninghill.cloudfunctions.net/nodejs-mongodb-atlas-api

* To test post requests for creating new values: curl -X POST -H "Content-Type: application/json" --data '{"database": "<database_name>","collection": "<collection_name>","method": "post","item":{"value":"<new_value>"}}' https://europe-west2-runninghill.cloudfunctions.net/nodejs-mongodb-atlas-api

* To test delete requests for deleting existing values: curl -X POST -H "Content-Type: application/json" --data '{"database": "<database_name>","collection": "<collection_name>","method": "delete","itemId":"<value_to_be_deleted>"}' https://europe-west2-runninghill.cloudfunctions.net/nodejs-mongodb-atlas-api

