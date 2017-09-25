var Toast = require('../mod/toast.js').Toast;
// 处理失去焦点函数
function handleBlur($ele,str,callback){
    $ele.on("blur",function(){
        var inputValue = $(this).val()
        if($.trim(inputValue) === ""){
            Toast(str)
            $(this).val("")
        }else{
            callback && callback(inputValue)
        }
    })
}
module.exports.handleBlur = handleBlur