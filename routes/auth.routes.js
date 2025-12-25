const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "aashdjka5as67474545";

//send otp
router.post('/send-otp',async(req,res)=>{
	const {mobile} = req.body;

	let user = await User.findOne({mobile});
	if(!user) user = new User({mobile});

	user.otp = '123456';//mock OTP
	user.otpExpires = Date.now() + 5 * 60 * 1000; //5min

	await user.save();

	// TODO: Integrate SMS API here
	res.json({success: true, message: "OTP sent"});
});

//VERIFY OTP
router.post('/verify-otp', async(req,res)=>{
	const { mobile, otp } = req.body
	
	const user = await User.findOne({mobile, otp});
	if(!user || user.otpExpires < Date.now()){
		return res.status(401).json({message: "Invalid or OTP expired"});
	}

	const token = jwt.sign(
		{userID : user._id, mobile},
		JWT_SECRET,
		{expiresIn: '7d'}
	);

	res.json({token});

});

module.exports = router;