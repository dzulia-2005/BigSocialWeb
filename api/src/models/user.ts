import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String , unique:true},
    password:String
},{timestamps:true})