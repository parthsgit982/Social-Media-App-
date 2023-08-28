import Post from "../models/Post.js";
import User from "../models/User.js";

// Create Post
const createPost = async (req, res) => {
  try {
    const { userId, description, picPath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      userName: user.userName,
      location: user.location,
      description,
      userPicPath: user.picPath,
      picPath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get All Posts
const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get All Posts Created By User
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update Post i.e. Like or Dislike
const likePost = async (req, res) => {
  try {
    const { id: PostId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(PostId);
    const isLiked = post.likes.get(userId);

    isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

    const updatedPost = await Post.findByIdAndUpdate(
      PostId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export { createPost, likePost, getUserPosts, getFeedPosts };
