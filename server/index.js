const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const { errorhandler } = require("./middlewares/errors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const path = require("path");
const verifyToken = require("./middlewares/verifyToken");
const cors = require("cors");

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieparser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", verifyToken, userRoute);
app.use("/api/post", verifyToken, postRoute);
app.use("/api/comments", verifyToken, commentRoute);
app.use("/api/conversation", verifyToken, conversationRoute);
app.use("/api/message", verifyToken, messageRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});


app.use(errorhandler);


connectDB();


module.exports = app;
