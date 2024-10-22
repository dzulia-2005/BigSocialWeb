const mongoose = require('mongoose');
const events = require('events');


// გაიზარდა listeners-ის ლიმიტი აპლიკაციისთვის
events.EventEmitter.defaultMaxListeners = 20;


const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        min : 3 ,
        max : 20,
        unique:true
    },

    email: {
        type:String,
        require:true,
        max:50,
        required:true,
        unique:true
    },

    password : {
        type:String,
        required:true,
        min:8,
    },

    profilepicture : {
        type:String,
        default : "",
    },

    coverpicture : {
        type:String,
        default : "",
    },

    followers : {
        type:Array,
        default: []
    }, 

    followings : {
        type : Array,
        default : []
    },

    isAdmin : {
        type:Boolean,
        default:false
    },

    desc:{
        type:String,
        max:50
    },

    city: {
        type:String,
        max:50
    },

    from: {
        type:String,
        max : 50
    },

    relationship : {
        type: Number,
        enum : [1,2,3]
    },

    
},
    {timestamps:true}
)

module.exports = mongoose.model('user',UserSchema)