// Dependencies
const config = require('config');
const Joi = require('joi');
const tasks = require('./routes/taskdb');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', tasks);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Starts server at required port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));