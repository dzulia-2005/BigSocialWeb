const mongoose = require('mongoose');
const events = require('events');


// გაიზარდა listeners-ის ლიმიტი აპლიკაციისთვის
events.EventEmitter.defaultMaxListeners = 20;


const PostSchema = new mongoose.Schema({
    userId : {
        type:String,
        required:true
    },

    desc : {
        type:String,
        max:500,
    },

    img : {
        type:String
    },

    likes : {
        type : Array,
        default : []
    }

},
    {timestamps:true}
)

module.exports = mongoose.model('Post',PostSchema)