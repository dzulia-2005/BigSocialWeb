const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const PostRoute = require('./routes/post')



dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL,);
        console.log('Connected to MongoDB ');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

connectDB();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'))


app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/post',PostRoute)

app.listen(8800,()=>{
    console.log("backend server is ready for running")
})




