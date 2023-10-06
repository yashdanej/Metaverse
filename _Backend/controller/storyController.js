const { peoples } = require('../model/peoples');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cloudinary = require('../utils/cloudinary');
const { stories } = require('../model/stories');

exports.addStory = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
    
        const peopleId = await peoples.findOne({user: userId});
        if (!peopleId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "posts"
        });
        let storyObj = {
            people: peopleId,
            story: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        };
        const createStory = await stories.create(storyObj);
        await peopleId.updateOne({stories: createStory});
        return res.status(201).json({story: createStory});
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.readStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        let token = req.headers.authorization;
        token = token.split(' ')[1];
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
    
        const peopleId = await peoples.findOne({user: userId});
        if (!peopleId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const story = await stories.findById(storyId);
        story.seen.push(peopleId);
        await story.save();
        return res.status(201).json({'message': 'Story read successful'});
    } catch (error) {
        // return res.status(400).json(error);
    }
}

exports.getStories = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
    
        const peopleId = await peoples.findOne({user: userId});
        if (!peopleId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const story = await stories.find({$and:[{seen: {$nin: peopleId}}, {people: {$ne: peopleId}}]}).populate('people').populate('seen');
        return res.status(200).json(story);
    } catch (error) {
        // return res.status(400).json(error);
    }
}

exports.getMyStories = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
    
        const peopleId = await peoples.findOne({user: userId});
        if (!peopleId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const story = await stories.find({people: {$eq: peopleId}}).populate('people').populate('seen');
        return res.status(200).json(story);
    } catch (error) {
        // return res.status(400).json(error);
    }
}

exports.getSeenStories = async (req, res) => {
    try {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
    
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;
    
        const peopleId = await peoples.findOne({user: userId});
        if (!peopleId) {
            return res.status(404).json({ error: 'User not found' });
        }
        const story = await stories.find({$and: [{seen: {$in: peopleId}}, {people: {$ne: peopleId}}]}).populate('people').populate('seen');
        return res.status(200).json(story);
    } catch (error) {
        // return res.status(400).json(error);
    }
}