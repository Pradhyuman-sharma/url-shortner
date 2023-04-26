//for authentication 

const express = require("express");
const router = express.Router();

const  Users  = require("../models/Users");


const bcrypt = require("bcrypt");

const { createTokens} = require("./JWT");
const mongoose = require("mongoose");


router.use(express.json());
//router.use(cookieParser());

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    })
      .then(() => {
        res.json("USER REGISTERED");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

router.post("/login", async (req, res) => {
  try{
  const { username, password } = req.body;

  const user = await Users.findOne({  username: username });

  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

  const dbPassword = user.password
  bcrypt.compare(password, dbPassword).then((match) => {
  
    if(!match) {
      res.status(400).json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      res.json("LOGGED IN");
    }
  
  });
}catch(err){
  res.status(401).json("something is wrong");
}
});

module.exports =  router