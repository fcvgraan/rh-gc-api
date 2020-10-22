/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

// << db setup >>
const db = require("./database");

exports.collectionLogic = (req, res) => {
    let collectionName = req.query.collection || req.body.collection;
    let dbName = req.query.database || req.body.database;
    let restMethod = req.query.method || req.body.method;
    let item = req.query.item || req.body.item;
    let itemId = req.query.itemId || req.body.itemId;

    db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
        // get all items

        if (restMethod == 'get') {
            dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            res.status(200).send(result);
            });

        }

        if (restMethod == 'post') {
            dbCollection.insertOne(item, (error, result) => { // callback of insertOne
                if (error) throw error;
                // return updated list
                dbCollection.find().toArray((_error, _result) => { // callback of find
                    if (_error) throw _error;
                    res.status(200).send(_result);
                });
            });

        }
        if (restMethod == 'put') {

            console.log("Editing item: ", itemId, " to be ", item);

            dbCollection.updateOne({ value: itemId }, { $set: item }, (error, result) => {
                if (error) throw error;
                // send back entire updated list, to make sure frontend data is up-to-date
                dbCollection.find().toArray(function (_error, _result) {
                    if (_error) throw _error;
                    res.status(200).send(_result);
                });
            });

        }

        if (restMethod == 'delete') {
            console.log("Delete item with id: ", itemId);

            dbCollection.deleteOne({ value: itemId }, function (error, result) {
                if (error) throw error;
                // send back entire updated list after successful request
                dbCollection.find().toArray(function (_error, _result) {
                    if (_error) throw _error;
                    res.status(200).send(_result);
                });
            });

        }

    }, function (err) { // failureCallback
        throw (err);
    });
};
