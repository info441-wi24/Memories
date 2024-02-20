import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js';

import usersRouter from './routes/users.js';
import apiRouter from './routes/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));

app.use((req, res, next) => {
    req.models = models;
    next();
})

app.use('/api', apiRouter);

// app.use('/api/users', usersRouter); 

app.get('/api', (req, res) => {
    res.send("testing this");
});

export default app;
