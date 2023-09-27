const UserModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

function makeToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
}

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "no users found" });
    }
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "server error" });
  }
}

async function createUser(req, res) {
  try {
    const { username, password, email } = req.body;
    const user = await UserModel.create({ username, password, email }).populate(
      "posts"
    );

    if (user) {
      const token = makeToken(user);
      res.status(201).json({ message: "user created succeffully", token });
    } else {
      res.status(400).json({ message: "couldn't create user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOneUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).populate("posts");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      if (user.password === password) {
        const token = makeToken(user);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "invalid password" });
      }
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllUsers, createUser, getOneUser, loginUser };
