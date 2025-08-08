import express from 'express';
import petRoutes from './routes/petRoutes.js'
import connectDb from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use('/pet', petRoutes);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})