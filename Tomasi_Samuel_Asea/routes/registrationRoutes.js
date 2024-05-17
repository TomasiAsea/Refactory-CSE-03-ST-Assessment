const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//import model
const userRegistration = require("../models/userRegistration")

router.get("/adduser", (req, res) => { // new
  res.render("index");
});

router.post("/adduser", async (req, res) => { // new
  try {
    const data = new userRegistration(req.body);
    await data.save();
     res.redirect("/adduser")
  }
  
   catch (error) {
    console.log(error);
    res.status(400).send("sorry, something went wrong");
    console.log("error registering user", error);
  }
});

module.exports = router;