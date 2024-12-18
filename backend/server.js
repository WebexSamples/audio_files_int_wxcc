import express from 'express';

const app = express();

app.listen(500, () => {
    console.log("Server started at http://localhost:5000");
});