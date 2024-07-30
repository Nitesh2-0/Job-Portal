import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './utils/db.js';


dotenv.config({}); 

const app = express();
const PORT = process.env.PORT || 3000; 

// Databse-Connection 
connectDB()

// middleware 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('tiny'))
const corsOption = {
  origin:'http://localhost:5173',
  credentials : true
}
app.use(cors(corsOption))



app.listen(PORT, () => console.log(`Server is running on port ${PORT} 👍👍👍`));
