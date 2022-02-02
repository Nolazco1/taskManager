// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Task, validate } = require('../models/database');
const router = express.Router();

//Displays all tasks
router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Displays a single task by id
router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).send('The task with the given ID was not found.');

    res.send(task);
});

// Creates a new task
router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task({
        title: req.body.title,
        task: req.body.task,
        additionalInfo: req.body.additionalInfo,
        category: req.body.category,
        tags: req.body.tags,
        severity: req.body.severity,
        completed: req.body.completed
    });
    console.log(task);
    task = await task.save();

    res.send(task);
});


// Updates an existing task by id
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        task: req.body.task,
        additionalInfo: req.body.additionalInfo,
        category: req.body.category,
        tags: req.body.tags,
        severity: req.body.severity,
        completed: req.body.completed
    }, {
        new: true
    });

    if (!task) return res.status(404).send('The task with the given ID was not found.');

    task = await task.save();

    res.send(task);
});

// Removes a task by id
router.delete('/:id', [auth, admin], async(req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);

    if (!task) return res.status(404).send('The task with the given ID was not found.');

    task = await task.delete();

    res.send(task);
});

module.exports = router;