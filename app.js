const Hapi = require('hapi');

// Init Server
const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

// Add Routes
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello world! Welcome!';
    }
});

server.route({
    method: 'GET',
    path: '/user/{name}',
    handler: (request, h) => {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

// Static Routes
/*
server.register(require('inert'),(err) => {
});
*/

// Start Server
const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();