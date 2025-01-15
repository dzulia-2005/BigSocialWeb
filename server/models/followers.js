const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user" 
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user" 
} ],
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Follower = mongoose.model("Notification", FollowersSchema);

module.exports = Follower;
