import express from 'express';
var router = express.Router();

import albumRouter from './api/albums.js';


router.use('/albums', albumRouter);

export default router;