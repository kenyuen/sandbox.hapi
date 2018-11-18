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
        //return 'Hello world! Welcome!';
        return h.view('index');
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
server.route({
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
        return h.file('./public/about.html');
    }
});

server.route({
    method: 'GET',
    path: '/image',
    handler: (request, h) => {
        return h.file('./public/hapi.png');
    }
});

// Start Server
const init = async() => {
    await server.register(require('inert'));
    await server.register(require('vision'));

    // Vision Templates or Views
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: __dirname + '/views'
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();