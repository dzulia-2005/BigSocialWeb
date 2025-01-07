const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to DB successfully!');
    }
    catch (error){
        console.log("database is not connected : ",error);
    }
}

module.exports = connectDB

