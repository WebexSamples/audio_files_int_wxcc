import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log("Server started at http://localhost:5000");
    console.log("Press Ctrl+C to quit.");
    connectDB();
});