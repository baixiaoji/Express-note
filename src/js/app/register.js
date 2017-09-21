require('less/register.less');
var Toast = require('../mod/toast.js').Toast;

$("#submit").on("click",function(e){
    e.preventDefault()
    var [username,password] = $("form").serializeArray();
    console.log(username,password)
    $.post("/api/user/add",{username:username.value,password:password.value})
    .done(function(ret){
        if(ret.status === 0){
            Toast('成功添加');
        }
    })
})