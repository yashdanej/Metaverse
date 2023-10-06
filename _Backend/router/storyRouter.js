const express = require('express');
const auth = require('../middleware/auth');
const storyController = require('../controller/storyController');
const { upload } = require('../middleware/upload');
const router = express.Router();

router
    .post('/story', upload.single('story'), auth, storyController.addStory)
    .patch('/seenstory/:id', auth, storyController.readStory)
    .get('/getstories', auth, storyController.getStories)
    .get('/getmystories', auth, storyController.getMyStories)
    .get('/getseenstories', auth, storyController.getSeenStories)

exports.router = router;