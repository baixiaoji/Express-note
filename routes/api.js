var express = require('express');
var router = express.Router();
var Note = require("../model/note").Note
/* GET users listing. */
router.get('/notes', function (req, res, next) {
   Note.findAll({raw:true}).then(function(notes){
        res.send({status:0,data:notes})
   })
//    res.send("nihc")
});

router.post("/notes/add", function (req, res, next) {
    // console.log("adding")
    var note = req.body.note
    Note.create({text:note}).then(function(){
        res.send({status:0})
    }).catch(function(){
        res.send({status:1,errorMsg:"数据库出错"})
    })
})

router.post("/notes/edit", function (req, res, next) {
    console.log("edit")
})

router.post("/notes/delete", function (req, res, next) {
    console.log("delete")
})


module.exports = router;
