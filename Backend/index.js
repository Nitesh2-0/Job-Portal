import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

// Databse-Connection 
connectDB();

// it require to access outside
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOption));

// middleware 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));


// api's 
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);


app.listen(PORT, () => console.log(`Server is running on port ${PORT} 👍👍👍`));
