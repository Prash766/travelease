import express from 'express';
import cors from 'cors';
import connectDB from './db/db';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.middleware';
import path from 'path'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

connectDB()

import UserRouter from './routes/user.routes';
app.use("/api/v1/users", UserRouter);


app.use(errorMiddleware);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
