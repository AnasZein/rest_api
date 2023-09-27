const express = require("express");

const userAuth = require("../middlewares/userAuth");
const {
  getAllPosts,
  createNewPost,
} = require("../controllers/posts.controller");

const router = express.Router();

router.use(userAuth);

router.get("/", getAllPosts);

router.post("/new", createNewPost);

module.exports = router;
