const express = require('express');
const User = require('../models/User.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log("hit")
  User.find().then((users)=> 
  console.log(users)).then(()=>   res.render("index", {user : req.session.currentUser} )
  )
});
module.exports = router;
