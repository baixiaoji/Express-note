var express = require('express');
var router = express.Router();
var Note = require("../model/note").Note


router.get('/', function (req, res, next) {
  var data;
  if (req.session.user) {
    data = {
      isLogin: true,
      user: req.session.user
    }
  } else {
    data = {
      isLogin: false
    }
  }
  console.log("758--------",data)
  res.render('login', {
    title:"登录页面"
  });
});
module.exports = router;
