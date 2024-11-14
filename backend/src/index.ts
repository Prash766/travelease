import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './db/db';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware';
import {v2 as cloudinary} from 'cloudinary'
import Stripe from 'stripe'
export const stripe =new Stripe(process.env.STRIPE_API_KEY as string)
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  
}));
app.options('*', cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
connectDB()

app.get('/', (req:Request, res:Response)=>{
  res.json({
   success:true,
   message:"Hello there endpoint hit successful"
 })
 
})


import UserRouter from './routes/user.routes';
import HotelRouter from './routes/hotels.routes'
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/hotels", HotelRouter)

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
