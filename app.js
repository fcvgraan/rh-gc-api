const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./database");
const dbName = "data";
const collectionName = "types";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  // << db CRUD routes >>
  server.post("/words", (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => { // callback of insertOne
      if (error) throw error;
      // return updated list
      dbCollection.find().toArray((_error, _result) => { // callback of find
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

  server.get("/words/:id", (request, response) => {
    const itemId = request.params.id;

    dbCollection.findOne({ id: itemId }, (error, result) => {
      if (error) throw error;
      // return item
      response.json(result);
    });
  });

  server.get("/words", (request, response) => {
    // return updated list
    dbCollection.find().toArray((error, result) => {
      if (error) throw error;
      response.json(result);
    });
  });

  server.put("/words/:id", (request, response) => {
    const itemId = request.params.id;
    const item = request.body;
    console.log("Editing item: ", itemId, " to be ", item);

    dbCollection.updateOne({ name: itemId }, { $set: item }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date
      dbCollection.find().toArray(function (_error, _result) {
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

  server.delete("/words/:id", (request, response) => {
    const itemId = request.params.id;
    console.log("Delete item with id: ", itemId);

    dbCollection.deleteOne({ name: itemId }, function (error, result) {
      if (error) throw error;
      // send back entire updated list after successful request
      dbCollection.find().toArray(function (_error, _result) {
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

}, function (err) { // failureCallback
  throw (err);
});

// << db init >>

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});