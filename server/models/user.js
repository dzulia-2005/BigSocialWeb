const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
  },

  email: {
      type: String,
      require:true,
      unique: true,
      trim:true,
      lowercase: true,
  },

  password: {
      type: String,
      require:true,
  },


  bio: {
    type: String,
    trim:true
  },

  profilePicture : {
    type:String,
    default:""
  },

  coverpicture : {
    type:String,
    default:""
  },

  posts : [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"post"
  }],

  followers : [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],

  following : [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],

  blocklist : [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }]

},{timestamps:true});

const user = mongoose.model("user",userSchema)
module.exports = user;
