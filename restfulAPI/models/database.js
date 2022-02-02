const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/taskManager')
    .then(() => console.log('Connected to MongoDB Database...'))
    .catch(err => console.error('Could not connect to MongoDB Database...', err));

// Task Schema
const Task = mongoose.model('Task', mongoose.Schema({
    title: { type: String, required: false },
    task: { type: String, required: false, maxlength: 25 },
    additionalInfo: { type: String, maxlength: 250 },
    category: { type: String, minlength: 3, required: false },
    tags: { type: Array, validate: { validator: function(v) { return v.length > 0; }, message: 'A task should have at least one tag' } },
    severity: { type: String, enum: ['Normal', 'Important', 'Very Important'] },
    completed: { type: Boolean, required: false, default: false }
}));

// Validation
function validateTask(task) {
    console.log(Task.tags);
    const schema = Joi.object({
        title: Joi.string().required(),
        task: Joi.string().max(25).required(),
        additionalInfo: Joi.string().max(250),
        category: Joi.string().min(3).required(),
        tags: Joi.array().items(Joi.string()).required(),
        severity: Joi.string().valid('Normal', 'Important', 'Very Important'),
        completed: Joi.boolean().required().default(false)
    });
    return schema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;