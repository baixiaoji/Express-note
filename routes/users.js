var express = require('express');
var router = express.Router();
var Note = require("../model/note").Note

router.get('/register', function (req, res, next) {
  // var data;
  // if (req.session.user) {
  //   data = {
  //     isLogin: true,
  //     user: req.session.user
  //   }
  // } else {
  //   data = {
  //     isLogin: false
  //   }
  // }
  // console.log(data)
  res.render('register', {
    title:"注册"
  });
});

module.exports = router;
