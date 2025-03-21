import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import audiofileRoutes from "./routes/audiofile.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/api/users", userRoutes);

app.use("/api/audiofiles", audiofileRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`server started at http://localhost:${PORT}`)
});