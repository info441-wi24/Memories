import express from 'express';
var router = express.Router();

import albumRouter from './api/albums.js';
import users from './users.js';


router.use('/albums', albumRouter);
router.use('/users', users);

export default router;