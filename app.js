const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const logger = require("./middlewares/logger");
const UsersRoutes = require("./routes/users.route");

const server = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.ino4voh.mongodb.net`;
const database = "rest_api";
const port = process.env.PORT || 3000;

mongoose
  .connect(`${server}/${database}`)
  .then(() => {
    console.log(`connected on ${database} database`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());

app.use(logger);

app.use("/users", UsersRoutes);

app.use("/posts", require("./routes/posts.route"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`app is runnig on http://localhost:${port}`);
});
