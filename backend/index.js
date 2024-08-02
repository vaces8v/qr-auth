import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import routeMessage from './routes/message.route.js';
import routerToken from './routes/token.route.js'
import dotenv from 'dotenv';
dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/token/', routerToken)
app.use('/api/messages/', routeMessage)


const PORT = process.env.API_PORT || 5000
app.listen(3500, () => {
	console.log(`Сервер успешно стартовал на http://localhost:${PORT}`)
})