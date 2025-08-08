import express from 'express';
import petRoutes from './routes/petRoutes.js'
const app = express();

app.use(express.json());

app.use('/pet', petRoutes);

app.listen(5000,()=>{
    console.log(`App is listening on port ${port}`);
})