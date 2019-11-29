// run me to initialize mongo db with default entries
// This one is experimental, not full functional with jsonSchema
// node ./data/task.js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://app:pass1234@ds211724.mlab.com:11724/hapidb";
const dbName = "hapidb";

const client = new MongoClient(url, { useNewUrlParser: true });

const deleteCollection = function(db, callback) {
    const collection = db.collection('tasks');
    collection.drop();
};

const createCollection = function(db, callback) {
    const collection = db.createCollection("tasks", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "Task Document",
                required: ["name", "description"],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    description: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    priority: {
                        enum: [1,2,3,4,5],
                        description: "can only be one of the enum values"
                    },
                    status: {
                        enum: ["Open","Inprogress","Complete","Cancelled"],
                        description: "can only be one of the enum values"
                    }
                }
            }
        },
        validationAction: "error"
    });
    console.log("Created collection");
};

const insertDocuments = function(db, callback) {
    const collection = db.collection('tasks');

    collection.insertMany([
        {name: "Task One", description: "First Task", priority: 1, status: "Open"},
        {name: "Task Two", description: "Second Task", priority: 2, status: "Open"}
    ], function(err,result) {
        assert.equal(err,null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted " + result.result.n + " documents into collection");
        callback(result);
    });
};

client.connect(function(err) {
    assert.equal(null,err);
    console.log("Connected succesfully to server");

    const db = client.db(dbName);

    deleteCollection(db);
    createCollection(db); // not sure if this is invoked

    insertDocuments(db, function() {
        client.close();
    });
});
    