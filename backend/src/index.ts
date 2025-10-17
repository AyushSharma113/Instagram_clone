import "./utils/loadEnv.ts";
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import connectDB from './utils/db.ts'
import path from "path";
import userRoute from './routes/user.route.ts'
import postRoute from './routes/post.route.ts'
import mongoose from "mongoose";



const PORT = process.env.PORT || 3000;

const app = express()

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute)
app.use('/api/v1/post', postRoute)


app.get('/', (req, res)=> {
    res.send('i am just checking')
})

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI as string | undefined
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment')
        }
        await mongoose.connect(uri);
        console.log('mongodb connected successfully.');
    } catch (error) {
           console.error('Error connecting to MongoDB:', error);
    }
}

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running at port ${PORT}`);
});