// Convenient script to build out the collection for a new MongoDB instance.

// clear
db.contacts.drop();

// create new
db.createCollection( "contacts", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "phone" ],
       properties: {
          phone: {
             bsonType: "string",
             description: "must be a string and is required"
          },
          email: {
             bsonType : "string",
             pattern : "@mongodb\.com$",
             description: "must be a string and match the regular expression pattern"
          },
          status: {
             enum: [ "Unknown", "Incomplete" ],
             description: "can only be one of the enum values"
          }
       }
    } }
 } );

 // insert by one
 db.contacts.insert({ phone : "123-143-1432", email : "foo@mongodb.com", status:"Incomplete"});
 db.contacts.insert({ phone : "123-143-foo2", email : "foo2@mongodb.com", status:"Incomplete"});
 db.contacts.insert({ phone : "123-143-foo3", email : "foo3@mongodb.com", status:"Incomplete"});
 db.contacts.insert({ phone : "123-143-foo4", email : "foo4@mongodb.com", status:"Unknown"});
 db.contacts.insert({ phone : "123-143-foo5", email : "foo5@mongodb.com", status:"Unknown"});

 // failed ones based on validations
 // bad email
 db.contacts.insert({ phone : "123-143-foo5", email : "foo5@bad.com"});
 // invalid status
 db.contacts.insert({ phone : "123-143-foo5", email : "foo5@mongodb.com", status:'fail'});
 
 // insert many
 /*
 db.contacts.insertMany( [
    { phone : "123-445-fo10", email : "foo10@mongodb.com", status:"Incomplete"},
    { phone : "123-445-fo11", email : "foo11@mongodb.com", status:"Incomplete"},
    { phone : "123-445-fo12", email : "foo12@mongodb.com", status:"Incomplete"},
    { phone : "123-445-fo13", email : "foo13@mongodb.com", status:"Incomplete"},
    { phone : "123-445-fo14", email : "foo14@mongodb.com", status:"Incomplete"}
 ]);
 */

 db.contacts.find();
 db.contacts.count();

 // clear
 db.contacts.drop();