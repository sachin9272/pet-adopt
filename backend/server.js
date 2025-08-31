import express from 'express';
import petRoutes from './routes/petRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
connectDb();
const app = express();

app.use(cors('*'))
app.use(express.json());

app.use('/api/pet', petRoutes);
app.use('/api/user', userRoutes)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})