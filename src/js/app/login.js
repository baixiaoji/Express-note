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
            location.href = "/user/"
        }else{
            Toast(ret.errorMsg);
          }
    })
})

$("#hoverWrapper").on("mousemove",function(e){
    var offset = $("#hoverWrapper").offset();
        
          var x = e.pageX - offset.left;
          var y = e.pageY - offset.top;
    
          var centerX = $("#hoverWrapper").outerWidth()/2;      
          var centerY = $("#hoverWrapper").outerHeight()/2;
          
          var deltaX = x - centerX;      
          var deltaY = y - centerY;
          
          var percentX = deltaX/centerX;     
          var percentY = deltaY/centerY;
        
          var deg = 20;
          
          $("#form").css({
            transform:'rotateX('+deg*-percentY+'deg)'+'rotateY('+deg*percentX+'deg)'
        })
})

$("#hoverWrapper").on("mouseleave",function(){
    $("#form").css({
        transform:'rotateX('+0+'deg)'+'rotateY('+0+'deg)'
    })
})