const express = require('express');
const auth = require('../middleware/auth');
const postController = require('../controller/postController');
const { upload } = require('../middleware/upload');
const router = express.Router();

router
    .post('/posts', upload.single('post'), auth, postController.post)
    .get('/posts', auth, postController.ProfileGetPost) 
    .get('/posts/:id', auth, postController.ProfileGetPostAndUser) 
    .delete('/post/:id', auth, postController.Deletepost)
    .patch('/post/like/:id', auth, postController.LikePost)
    .get('/post/followingPost', auth, postController.FollowingPost)
    .patch('/post/:id/comment/', auth, postController.AddComment)
    .delete('/post/:post_id/comment/:comment_id', auth, postController.DeleteComment)
exports.router = router;