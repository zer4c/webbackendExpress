const express = require('express');
const todoItemRoutes = require('../modules/item/routes.js');
const {errorMiddleware }= require('../middleware/error.js')

const app = express();
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json());

app.use('/todolist/item', todoItemRoutes);
app.use(errorMiddleware)

module.exports = app;