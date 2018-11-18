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
        return 'Hello world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

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