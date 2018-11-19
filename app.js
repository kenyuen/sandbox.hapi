const Hapi = require('hapi');
const mongoose = require('mongoose');
const Task = require('./models/Task');

// mongoose to mLab
mongoose.connect('mongodb://app:pass1234@ds211724.mlab.com:11724/hapidb', {
		useNewUrlParser: true
	})
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.error(err));


// Init Server
const server = Hapi.server({
	port: 3000,
	host: '0.0.0.0'
});

// Home Routes
server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => {
		//return 'Hello world! Welcome!';
		return h.view('index', {
			name: 'John Doe'
		});
	}
});

// Dynamic Routes
server.route({
	method: 'GET',
	path: '/user/{name}',
	handler: (request, h) => {
		return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
	}
});

// POST Task Route
server.route({
	method: 'POST',
	path: '/api/v1/tasks',
	handler: (request, h) => {
		let text  = request.payload.text;
		let newTask = new Task({
			text
		});
		return Task.save();
		//return h.redirect().location('tasks');
	}
});

// GET Task Route
server.route({
	method: 'GET',
	path: '/api/v1/tasks',
	handler: (request, h) => {
		return Task.find();
	}
});

server.route({
	method: 'GET',
	path: '/tasks',
	handler: (request, h) => {
		/*		let tasks = Task.find((err, tasks) => {
					//console.log(tasks)
					if (err) return handleError(err);
			*/
		//console.log(tasks);
		//   return Task.find();
		return h.view('tasks', Task.find());
		/*
		return h.view('tasks', {
			tasks: [{
					text: 'TestOne'
				},
				{
					text: 'TestTwo'
				}
			]
		});

		*/
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
const init = async () => {
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