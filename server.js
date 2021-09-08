const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const app = express();
app.use(express.json());
app.use(cors());



const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "mervynlevis",
    password: "",
    database: "facerecognition",
  },
});

// routes

app.get("/", (req, res) => {
  res.send(database.users);
});

// SIGNIN

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

// REGISTER

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// PROFILE

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

// IMAGE

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
