require('less/login.less');
var Toast = require('../mod/toast.js').Toast;

$("#submit").on("click",function(e){
    e.preventDefault()

    var [username,password] = $("form").serializeArray();
    //console.log(username,password)
    
    $.post("/api/user/login",{username:username.value,password:password.value})
    .done(function(ret){
        if(ret.status === 0){
            Toast('登录成功');
            location.href = "/"
        }else{
            Toast(ret.errorMsg);
          }
    })
})
