// Dependencies
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// Tasks Array
const tasks = [
    { id: 1, task: 'task1' },
    { id: 2, task: 'task2' },
    { id: 3, task: 'task3' },
]

// Validation Check function
function validateTask(task) {
    const schema = Joi.object({ task: Joi.string().min(1).required() });

    return schema.validate(task);
}

// Displays current tasks
app.get('/taskManager/tasks', (req, res) => {
    res.send(tasks);
});

// Displays current task on certain id
app.get('/taskManager/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');
    res.send(task);
});

// Adds a new task
app.post('/taskManager/tasks', (req, res) => {
    const { error } = validateTask(req.body);

    if (error) return res.status(400).send('Task name is required');

    const task = {
        id: tasks.length + 1,
        task: req.body.task
    };
    tasks.push(task);
    res.send(task);
});

// Updates a task
app.put('/taskManager/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');

    const { error } = validateTask(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    task.task = req.body.task;
    res.send(task);
});

// Removes a task by id
app.delete('/taskManager/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given ID was not found.');

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.send(task);
});

//Starts server at required port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));