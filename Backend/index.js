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

// middleware 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

// Create CORS options
const corsOptions = {
  origin: '*', // Allow all origins
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};

// Use CORS middleware with options
app.use(cors(corsOptions));



// api's 
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT} 👍👍👍`));
