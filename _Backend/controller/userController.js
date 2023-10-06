const { users } = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { peoples } = require('../model/peoples');
exports.SignUp = async (req, res) => {
  try {
    const existingemail = await users.findOne({email: req.body.email});
    const existinguser = await users.findOne({username: req.body.username});
    if(existingemail){
      return res.status(400).json({'message': `${req.body.email} this email has been already taken`})
    }else if(existinguser){
      return res.status(400).json({'message': `${req.body.username} this username has been already taken`})
    }else{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const result = await users.create({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
      });
      await peoples.create({
        user: result,
        username: req.body.username,
        profilePic: {public_id: '1', url: 'https://res.cloudinary.com/dbb3q0p82/image/upload/v1694156664/profile_jsgyay.png'}
      })
      const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET_KEY)
      res.status(201).json({'user': result, 'token': token});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.LogIn = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await users.findOne({ email });
      if(!user){
        return res.status(404).json({'message': 'User not found.'});
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if(!matchPassword)  {
        return res.status(400).json({'message': 'invalid Creadentials'});
      }
      const token = jwt.sign({email: user.email, id: user._id}, process.env.SECRET_KEY);
      res.status(201).json({'user': user, 'token': token});
    } catch (error) {
      res.status(400).json(error);
    }
};
