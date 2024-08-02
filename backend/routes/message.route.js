import express from 'express';
import controller from '../controller/message.controller.js';
const route = express.Router()

route.get('/test', controller.getMesseages)

export default route;