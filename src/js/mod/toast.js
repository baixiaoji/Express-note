require('less/toast.less');


function toast(msg,time,status){
    this.msg = msg;
    this.dismissTime = time || 1000;
    this.status = status || "success"
    this.checkStatus(this.status)
    this.createToast()
    this.showToast()
}

toast.prototype = {
    checkStatus:function(status){
        var spanTpl = ""
        console.log("toast",status)
        switch(status){
            case "error":
                spanTpl =  `<span class="fa fa-exclamation-circle" style="color: #f04134;"></span>`
                break;
            default:
                spanTpl = `<span class="fa fa-check-circle" style="color:#00a854;"></span>`
        }
        this.spanTpl = spanTpl
    },
    createToast: function(){
        var tpl = `<div class="toast">${this.spanTpl} ${this.msg}</div>`
        this.$toast = $(tpl)
        $("body").append(this.$toast)
    },
    showToast: function(){
        var self = this;
        this.$toast.fadeIn(300,function(){
            setTimeout(function(){
                self.$toast.fadeOut(300,function(){
                    self.$toast.remove();
                })
            },self.dismissTime)
        })
    }
}

function Toast(msg,time,status){
    return new toast(msg,time,status)
}

module.exports.Toast = Toast;