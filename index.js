import express from 'express';
import cors from 'cors'
import "dotenv/config";
import petRouter from './routes/pets.routes.js'
import userRouter from './routes/users.routes.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use('/pets', petRouter)
app.use('/users', userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Escuchando puerto ${PORT}`);
 });