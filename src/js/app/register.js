require('less/register.less');
var Toast = require('../mod/toast.js').Toast;
var handleBlur = require('../mod/handleInput.js').handleBlur;

function checkUsername(val){
    $.post("/api/user/checkUsername",{username:val})
    .done(function(ret){
        if(ret.status === 0){
            Toast('该用户名可用');
        }else{
            Toast(ret.errorMsg);
          }
    })
}
handleBlur($(".password"),"密码不能为空")
handleBlur($(".username"),"用户名不能为空",checkUsername)

$("#submit").on("click",function(e){
    e.preventDefault()
    var [username,password] = $("form").serializeArray();
    console.log(username,password)
    $.post("/api/user/add",{username:username.value,password:password.value})
    .done(function(ret){
        if(ret.status === 0){
            Toast('成功添加');
        }else{
            Toast(ret.errorMsg);
            $("input").val("")
            $(".username").focus();
          }
    })
})