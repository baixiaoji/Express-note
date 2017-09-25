var express = require('express');
var router = express.Router();

/* GET home page.  路由控制*/
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
  console.log(data)
  res.render('index', data);
});


router.get('/user', function (req, res, next) {
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
  // console.log(data)
  res.render('user', data);
});

module.exports = router;
