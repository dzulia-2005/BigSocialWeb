import express, { Request, Response, } from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const mongoUrl: string | undefined = process.env.MONGO_URL;

if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined");
}

mongoose.connect(mongoUrl)
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.error("Database connection error:", error));

    console.log(process.env.MONGO_URL)
const app = express();

app.get('/test', (req: Request, res: Response) => {
    res.json("test ok");
});

app.post('/register', (req:Request,res:Response) => {

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
