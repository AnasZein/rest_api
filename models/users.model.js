const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    validate: (data) => {
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
      return regex.test(data);
    },
  },
  email: {
    type: String,
    required: true,
    validate: (data) => {
      return validator.isEmail(data);
    },
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "posts",
    default: [],
  },
});

// module.export = mongoose.model("users", UserSchema);

const User = mongoose.model("users", UserSchema);

module.exports = User;
