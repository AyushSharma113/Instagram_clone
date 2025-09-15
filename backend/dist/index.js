import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './utils/db.ts';
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
// Load .env from the parent directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const PORT = process.env.PORT || 3000;
const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL,
    credentials: true
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('i am just checking');
});
app.listen(PORT, () => {
    connectDB();
    console.log(`server is running at port ${PORT}`);
});
//# sourceMappingURL=index.js.map