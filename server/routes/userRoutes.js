const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/authMiddleware.js');

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user object using the data from the request body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;
    req.body.confirmPassword = hashedPassword;
    
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      termsAndConditions: req.body.termsAndConditions,
      profilePicture: req.body.profilePicture 
    });

    
    await newUser.save();

    //generate jwt token

    const token = jwt.sign({userId: newUser._id, emailId: newUser.email}, process.env.jwt_secret, {expiresIn: "1d"} );

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Registration successful', jwt:token });
  } catch (error) {
    // If an error occurs, log it and send a 500 response
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.post("/login",async(req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return res.status(403).json({ success: false, message: 'User does not  exists' });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword){
    return res.status(401).json({success:false, message: 'Invalid Credentials'})
  };

  const token = jwt.sign({userId: user._id, emailId: user.email}, process.env.jwt_secret, {expiresIn: "1d"} );

  return res.status(200).json({success:true, message:'User Logged In', jwt:token})
})

router.get('/get-current-user', authMiddleware, async (req,res)=>{
  try{
    const user = await User.findById(req.body.userId ).select("-password").select("-confirmPassword");
    
    res.send({
      success:true,
      message:"User details fetch Successfully",
      data:user,
    })

  } catch(err){
    return res.status(500).json({success:false, message:'Something went wrong'})
  }
})

module.exports = router;
