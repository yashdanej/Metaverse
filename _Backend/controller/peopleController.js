const { peoples } = require("../model/peoples");
var fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

exports.People = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const peopleId = await peoples.findOne({user: userId});
    const following = peopleId.following;

    const getpeople = await peoples.find({$and: [{_id: {$ne: peopleId._id}}, {_id: {$nin: following}}]}).populate('user');
    if (getpeople.length > 0) {
      res.status(200).json(getpeople);
    } else {
      res.status(200).json({ 'message': 'No people to show' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'Internal server error' });
  }
};

exports.FollowingPeople = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const peopleId = await peoples.findOne({user: userId});
    const following = peopleId.following;
    const follower = peopleId.follower;

    const getpeople = await peoples.find({$and: [{_id: {$ne: peopleId._id}}, {_id: {$in: following}}, {_id: {$in: follower}}]}).populate('user');
    if (getpeople.length > 0) {
      res.status(200).json(getpeople);
    } else {
      res.status(200).json({ 'message': 'No people to show' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'Internal server error' });
  }
};

exports.LoggedUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const peopleId = await peoples.findOne({user: userId}).populate('user').populate('following').populate('follower');
    if (peopleId) {
      res.status(200).json(peopleId);
    } else {
      res.status(200).json({ 'message': 'No logged user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'Internal server error' });
  }
};


exports.UpdatePeopleProfile = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) return res.status(404).send('The profile with the given ID was not found.');
    const getPeople = await peoples.findById(id);
    if (!getPeople) return res.status(404).send('The profile with the given ID was not found.');
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts"
    });
    let bio;
    let profilePic;
    let location;
    if(req.body.bio){
      bio = req.body.bio;
    }
    if(req.file){
      profilePic = {
        public_id: result.public_id,
        url: result.secure_url
      }
    }
    if(req.body.location){
      location = req.body.location;
    }
    await getPeople.updateOne({bio:bio, profilePic: profilePic, location: location})
    res.status(200).json(getPeople);
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.FollowUnfollow = async (req, res) => {
  try {
    const id = req.params.id;
    const peopleId = await peoples.findById(id);
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const getLoggedPeople = await peoples.findOne({user: userId});
    const userFollowindex = getLoggedPeople.following.indexOf(id);
    const userFollowerindex = peopleId.follower.indexOf(getLoggedPeople._id);
    if(userFollowindex === -1){
      getLoggedPeople.following.push(peopleId);
      peopleId.follower.push(getLoggedPeople);
      await getLoggedPeople.save();
      await peopleId.save();
      return res.status(200).json({ 'success': true, 'message': 'Following added' });
    }else{
      getLoggedPeople.following.splice(userFollowindex, 1);
      peopleId.follower.splice(userFollowerindex, 1);
      await getLoggedPeople.save();
      await peopleId.save();
      return res.status(200).json({ 'success': true, 'message': 'Following removed' });
    }
  } catch (error) {
    res.status(400).json(error);
  }
}