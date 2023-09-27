const PostModel = require("../models/posts.model");
const UserModel = require("../models/users.model");

async function getAllPosts(req, res) {
  try {
    const posts = await PostModel.find({}).populate("author");
    if (posts) {
      res.status(200).send(posts);
      return;
    }
    res.status(400).send("Something went wrong");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createNewPost(req, res) {
  try {
    const id = req.user.id;
    const post = req.body;
    post.author = id;
    const newPost = await PostModel.create(post);
    if (newPost) {
      const user = await UserModel.findById(id);
      user.posts.push(newPost._id);
      await user.save();

      res.status(201).send(newPost);
      return;
    }
    res.status(400).send("Something went wrong");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllPosts, createNewPost };
