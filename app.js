const Hapi = require('hapi');

// Init Server
const server = new Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

// Home Route
server.route({
    method:'GET',
    path:'/hello',
    handler: (request, reply) => {
        reply('Hello World');
    }
});

// Start Server
server.start((err) => {
    if(err) {
        throw err;
    }
    console.log('Server start at: ${server.info.uri}');
});