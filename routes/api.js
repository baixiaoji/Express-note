var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function (req, res, next) {
    res.send('nihc');
});

router.post("/notes/add", function (req, res, next) {
    console.log("adding")
})

router.post("/notes/edit", function (req, res, next) {
    console.log("edit")
})

router.post("/notes/delete", function (req, res, next) {
    console.log("delete")
})


module.exports = router;
