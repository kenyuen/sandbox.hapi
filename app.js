const Hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');
const Task = require('./models/Task');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

// Init Server
const server = Hapi.server({
	port: 3000,
	host: '0.0.0.0'
});

// mongoose to mLab
mongoose.connect('mongodb://app:pass1234@ds211724.mlab.com:11724/hapidb', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
	console.log('MongoDB connected...');
});

// Start Server
const init = async () => {

	//Swagger
	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: 'Task API Documentation',
					version: Pack.version
				}
			}
		}
	]);

	// graphQL
	await server.register({
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route: {
				cors: true
			}
		}
	});

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			},
			route: {
				cors: true
			}
		}
	});

	// routes
	server.route([
		{
			method: 'GET',
			path: '/api/v1/tasks',
			config: {
				description: 'Get all the tasks',
				tags: ['api', 'v1', 'task']
			},
			handler: (req, reply) => {
				return Task.find();
			}
		},
		{
			method: 'POST',
			path: '/api/v1/tasks',
			config: {
				description: 'Create a task',
				tags: ['api', 'v1', 'task']
			},
			handler: (req, reply) => {
				const { text } = req.payload;
				const task = new Task({text});

				return task.save();
			}
		}
	]);

	// server start
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();