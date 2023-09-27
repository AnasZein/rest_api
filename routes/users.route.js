const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  loginUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getOneUser);

router.post("/", createUser);

router.post("/login", loginUser);

module.exports = router;
