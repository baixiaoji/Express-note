var express = require('express');
var router = express.Router();

/* GET home page.  路由控制*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'baixiaoji' });
});

module.exports = router;
