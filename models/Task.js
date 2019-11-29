const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	name: String,
	description: String,
	priority: Number,
	status: String
});

module.exports = mongoose.model('Task',TaskSchema);