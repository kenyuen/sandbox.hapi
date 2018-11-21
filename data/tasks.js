db.tasks.drop();

db.createCollection("tasks", {
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

db.tasks.insert({ 
    name: "Task One",
    description: "First Task",
    priority: 1,
    status: "Open"    
});

db.tasks.insert({ 
    name: "Task Two",
    description: "First Two",
    priority: 2,
    status: "Open"    
});

db.tasks.find();
