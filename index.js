const hapi = require('hapi');

const server = hapi.server({
    port: 3000,     // for code anywhere to be exposed
    host: '0.0.0.0' // yes, this is opened to the public.  it is a sandbox! 
    //host: 'localhost'
})

const init = async () => {
    await server.start();
    console.log('Server running at: ${server.info.uri}');
};

init();