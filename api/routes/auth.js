const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt')

//Register/რეგისტრაცია
router.post('/register', async(req,res)=>{
   try{
        // generate new pass /დავაგენერიროთ ახალი პაროლი
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        
        // create new user / შევქმნათ ახალი user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
           })

        // save user and return response /შევინახოთ user და დავაბრუნოთ response
        const saveduser = await newUser.save()
        res.status(200).json(saveduser);

   }catch(err){
        res.status(500).json(err)
   }

})


//login
router.post('/login' ,async (req,res)=> {
   try {

        const user = await User.findOne({email:req.body.email});
            if (!user) {
                return res.status(404).json("User not found");
            }
            
            console.log('Request Password:', req.body.password);
            console.log('Stored Hashed Password:', user.password);

         const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).json("Wrong password");
            }
   
        return res.status(200).json(user);


   } catch (err) {
        console.log(err)
        console.log('Error: ', err.message);
        res.status(500).json(err)

    }

})

module.exports = router