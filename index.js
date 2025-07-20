import express from 'express';
import cors from 'cors'
import "dotenv/config";
import petRouter from './routes/pets.routes.js'
import userRouter from './routes/users.routes.js';
import requestRouter from './routes/request.routes.js';

export const app = express(); //Export para que funcione Jest

app.use(cors())
app.use(express.json())
app.use('/api/pets', petRouter);
app.use('/users', userRouter)
app.use('/request',requestRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Escuchando puerto ${PORT}`);
 });