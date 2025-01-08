const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/errors");



const registerController = async (req,res,next) => {
    try {
        const {password,username,email} = req.body;
        const existinguser = await user.findOne({$or : [{username},{email}] });
        if(existinguser){
            throw new CustomError("Username or email already exists!",400)
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const newuser = new user({...req.body, password:hashedpassword});
        const saveduser = await newuser.save();
        res.status(201).json(saveduser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginControllers = async (req, res, next) => {
    try {
        let User;
        if (req.body.email) {
            User = await user.findOne({ email: req.body.email });
        } else {
            User = await user.findOne({ username: req.body.username });
        }

        if (!User) {
            throw new CustomError("User not found", 404);
        }

        const match = await bcrypt.compare(req.body.password, User.password);

        if (!match) {
            throw new CustomError("Wrong credentials", 401);
        }

        // Access Token გენერაცია
        const accessToken = jwt.sign(
            { _id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        // Refresh Token გენერაცია
        const refreshToken = jwt.sign(
            { _id: User._id },
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: process.env.JWT_REFRESH_EXPIRE } 
        );

        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        // Access Token-ის დაბრუნება API პასუხში
        res.status(200).json({ accessToken ,refreshToken});
    } catch (error) {
        next(error);
    }
};


const refetchuserControllers = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        try {
            const id = data._id;
            const User = await user.findOne({ _id: id }).select("-password");
            if (!User) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(User);
        } catch (error) {
            next(error);
        }
    });
};


const logoutControllers = async (req,res,next) => {
    try {
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).json("user log out succesfully");
    } catch (error) {
        next(error)
    }
}



const refreshTokenController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            console.log("Refresh token not provided.");
            throw new CustomError("Refresh token not provided", 401);
        }

        console.log("Refresh token received:", refreshToken);

        const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log("Refresh token valid:", data);

        const newAccessToken = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.log("Error:", error);
        next(new CustomError("Invalid or expired refresh token", 403));
    }
};

module.exports = {
    registerController,
    loginControllers,
    logoutControllers,
    refetchuserControllers,
    refreshTokenController
    
}