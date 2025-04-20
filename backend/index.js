import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
//require('dotenv').config();
import dotenv from "dotenv"
import DatabaseConnect from "./models/dbConnect.js";
dotenv.config({
    path: './.env'
})
DatabaseConnect()
import authRoutes from "./routes/authRoutes.js";
import postRoutes from './routes/postRoutes.js';
const PORT = process.env.PORT || 8080;

//app.use(cors());

app.use(cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  }));

app.use(express.json({limit:"16kb"}))
app.use(cookieParser())


app.use('/auth', authRoutes); // <- NEW LINE
app.use('/post', postRoutes); // <- NEW LINE

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})