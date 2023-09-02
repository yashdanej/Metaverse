const { peoples } = require('../model/peoples');
const { posts } = require('../model/post');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

// for posting
exports.post = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const peopleId = await peoples.findOne({ user: userId });
    if (!peopleId) {
      return res.status(404).json({ error: 'User not found' });
    }
    let postObj = {
      people: peopleId,
      post: req.file.path,
      caption: req.body.caption,
      location: req.body.location
    };

    const createPost = await posts.create(postObj);
    res.status(201).json({ post: createPost });
  } catch (error) {
    res.status(400).json(error);
  }
};

// to get login people post
exports.ProfileGetPost = async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(' ')[1];
  
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const userId = decoded.id;

      const peopleId = await peoples.find({user: userId});
      const getPosts = await posts.find({people: peopleId, isDeleted: false}).populate('people').populate('comments');
      if (getPosts.length > 0) {
        res.status(200).json(getPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        res.status(200).json({ 'message': 'No post to show' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

exports.ProfileGetPostAndUser = async (req, res) => {
  try {
    const id = req.params.id;
    const getPosts = await posts.find({people: id, isDeleted: false}).populate('people').populate('comments');
    const getPeople = await peoples.findById(id);
    if (getPosts.length>0) {
      return res.status(200).json(getPosts);
    }else{
      return res.status(200).json(getPeople);
    }
  } catch (error) {
      console.error(error);
      res.status(500).json(error);
  }
}


exports.Deletepost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(404).send('The profile with the given ID was not found.');
    await posts.findByIdAndUpdate({_id: id}, {isDeleted: true}, {new: true});
    res.status(200).json({'success': true, 'message': `this post deleted successfully`});
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

exports.LikePost = async (req, res) => {
  try {
    const id = req.params.id;
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const post = await posts.findById(id);
    if (!post) {
      return res.status(404).json({ 'success': false, 'message': 'Post not found' });
    }

    const userLikedIndex = post.likes.indexOf(userId);

    if (userLikedIndex === -1) {
      // User hasn't liked the post, so add the user ID to the likes array
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ 'success': true, 'message': 'Post liked' });
    } else {
      // User already liked the post, so remove the user ID from the likes array
      post.likes.splice(userLikedIndex, 1);
      await post.save();
      return res.status(200).json({ 'success': true, 'message': 'Post disliked' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

exports.FollowingPost = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const getLoggedPeople = await peoples.findOne({ user: userId });
    const followingPeople = getLoggedPeople.following;

    const getFollowingPosts = await posts.find({
      people: { $in: followingPeople },
      isDeleted: false,
    }).populate('people').populate('comments.getPeople');
    const filteredPosts = getFollowingPosts.map(post => {
      const filteredComments = post.comments.filter(comment => !comment.isDeleted).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log('filteredComments', filteredComments)
      return { ...post.toObject(), comments: filteredComments };
    });

    if (filteredPosts.length > 0) {
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json(filteredPosts);
    } else {
      return res.status(200).json({ 'message': 'No post to show' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}


exports.AddComment = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const getLoggedPeople = await peoples.findOne({user: userId});

    const id = req.params.id;
    const post = await posts.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.comments.push({
        getPeople: getLoggedPeople,
        comment: req.body.comments.comment
    });
    await post.save();
    res.status(200).json({'success': true, 'meesage': 'Comment added successfully'});
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

exports.DeleteComment = async (req, res) => {
  try {
    const { post_id, comment_id } = req.params;
    const post = await posts.findOne({$and: [{_id: post_id}, {isDeleted: false}]});
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === comment_id
    );
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    post.comments[commentIndex].isDeleted = true;
    await post.save();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
