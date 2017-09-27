var express = require('express');
var router = express.Router();
var Note = require("../model/note").Note
var User = require("../model/user").User
/* GET users listing. */
router.get('/notes', function (req, res, next) {
    var query = { raw: true }
    // if (req.session.user) {
    //     query.where = {
    //         uid: req.session.user.id
    //     }
    // }
    // console.log("game",query)
    Note.findAll(query).then(function (notes) {
        res.send({ status: 0, data: notes })
    }).catch(function () {
        res.send({ status: 1, errorMsg: '数据库出错' })
    })
});
router.get('/unotes', function (req, res, next) {
    var query = { raw: true }
    if (req.session.user) {
        query.where = {
            uid: req.session.user.id
        }
    }
    console.log("game",query)
    Note.findAll(query).then(function (notes) {
        res.send({ status: 0, data: notes })
    }).catch(function () {
        res.send({ status: 1, errorMsg: '数据库出错' })
    })
});

router.post("/notes/add", function (req, res, next) {
    if (!req.session || !req.session.user) {
        return res.send({ status: 1, errorMsg: '请先登录' })
    }
    if (!req.body.note) {
        return res.send({ status: 2, errorMsg: '内容不能为空' });
    }
    // console.log("adding")
    var uid = req.session.user.id
    var note = req.body.note
    var username = req.session.user.username;
    var update =  req.body.time
    Note.create({ text: note, uid: uid,username:username,createdAt:update}).then(function () {
        res.send({ status: 0 })
    }).catch(function () {
        res.send({ status: 1, errorMsg: "数据库异常或者你没有权限" })
    })
})

router.post("/notes/edit", function (req, res, next) {
    console.log("edit")
    if(!req.session || !req.session.user){
        return res.send({status: 1, errorMsg: '请先登录'})
    }

    var uid = req.session.user.id
    var role = req.session.user.role
    var noteId = req.body.id
    // can't modify the other people's note
    Note.findOne({raw:true,where:{id:noteId}}).then(function(item){
        console.log("找到的",item)
        if(item.uid === uid){
            Note.update({ text: req.body.note }, { where: { id:noteId, uid: uid } }).then(function () {
                res.send({ status: 0 })
            }).catch(function () {
                res.send({ status: 1, errorMsg: "数据库出错" })
            })
        }else if(role === 1){
            Note.update({ text: req.body.note }, { where: { id:noteId, uid: item.uid } }).then(function () {
                res.send({ status: 0 })
            }).catch(function () {
                res.send({ status: 1, errorMsg: "数据库出错" })
            })
        }else{
            res.send({status:1,errorMsg:"不能修改他人便签"})
        }
       
    }).catch(function () {
        res.send({ status: 1, errorMsg: "数据库出错" })
    })
})

router.post("/notes/delete", function (req, res, next) {
   if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
    var uid = req.session.user.id
    var noteId = req.body.id
    var role = req.session.user.role
    Note.findOne({raw:true,where:{id:noteId}}).then(function(item){
        if(item.uid === uid){
            Note.destroy({ where: { id: req.body.id, uid: uid } }).then(function () {
                res.send({ status: 0 })
            }).catch(function () {
                res.send({ status: 1, errorMsg: "数据库出错" })
            })
        }else if(role === 1){
            Note.destroy({ where: { id: req.body.id, uid: item.uid } }).then(function () {
                res.send({ status: 0 })
            }).catch(function () {
                res.send({ status: 1, errorMsg: "数据库出错" })
            })
        }else{
            res.send({status:1,errorMsg:"不能删除他人便签"})
        }
    }).catch(function () {
        res.send({ status: 1, errorMsg: "数据库出错" })
    })
    
})

/**
 * 用户注册
 * add user  -->   api/user/add   
 * login user --> api/user/login
 */

router.post("/user/checkUsername",function(req,res,next){
    var username = req.body.username
    User.findOne({raw:true,where:{username:username}}).then((person)=>{
        if(person){
            res.send({ status: 1, errorMsg: "该用户名已被注册" })
        }else{
            res.send({status:0})
        }
    })
})
router.post("/user/add", function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
    User.findOne({raw:true,where:{username:username}}).then((person)=>{
        console.log(person)
        if(person){
            res.send({ status: 1, errorMsg: "该用户名已被注册" })
        }else{
            User.create({
                username,
                password
            }).then(function(){
                res.send({status:0})
            }).catch(function () {
                res.send({ status: 1, errorMsg: "数据库异常或者你没有权限" })
            })
        }
    })
})
router.post("/user/login", function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
   
    User.findOne({raw:true,where:{username:username}}).then(function(person){
       console.log(person)
        if(person.password === password){
            req.session.user = {
                id: person.id,
                username: person.username,
                avatar: "",
                provider: "baiji",
                role:person.role
            };
            console.log("----------")
            console.log(req.session.user)
            res.send({status:0})
        }else{
            res.send({ status: 1, errorMsg: "密码错误" })
        }
    }).catch(function () {
        res.send({ status: 1, errorMsg: "没有该用户" })
    })
})

module.exports = router;
