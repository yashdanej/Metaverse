const express = require('express');
const auth = require('../middleware/auth');
const peopleController = require('../controller/peopleController');
const { upload } = require('../middleware/upload');
const router = express.Router();

router
    .get('/people', auth, peopleController.People)
    .get('/loggedPeople', auth, peopleController.LoggedUser)
    .get('/followingPeople', auth, peopleController.FollowingPeople)
    .patch('/people/:id', upload.single('profilePic'), auth, peopleController.UpdatePeopleProfile)
    .patch('/people/follow/:id', auth, peopleController.FollowUnfollow)
exports.router = router;