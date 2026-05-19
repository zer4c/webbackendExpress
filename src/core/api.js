const express = require('express');
const todoItemRoutes = require('../modules/item/routes.js');

const app = express();

app.use(express.json());

app.use('/todolist/item', todoItemRoutes);

module.exports = app;