'use strict';

const hapi = require('hapi');

// Create a server with a host and port
const server = hapi.server({
    port: 3000,     // for code anywhere to be exposed
    host: '0.0.0.0' // yes, this is opened to the public.  it is a sandbox! 
    //host: 'localhost'
})

// Hone Route
server.route({
    method: 'GET',
    path: '/',
    handler: (request,reply) => {
        reply('Hello World');
    }
});

// Start the server
server.start((err) => {
    if(err){
        throw err;
    }

    console.log(`Server started at: ${server.info.uri}`);
});

