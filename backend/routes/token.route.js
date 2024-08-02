import express from 'express';
import controller from '../controller/token.controller.js';
const route = express.Router()

route.post('/generate-token', controller.generateToken)
route.post('/authenticate', controller.authenticateToken)
route.post('/check', controller.checkToken)

export default route;