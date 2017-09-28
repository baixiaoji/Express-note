require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');

function Note(opts){
  this.initOpts(opts);
  this.createNote();
  // this.setStyle();
  this.bindEvent();
}
Note.prototype = {
  colors: [
    ['#fff','#fff',"one"], // headColor, containerColor
    ['#dd598b','#e672a2',"two"],
    ['#eee34b','#f2eb67',"three"],
    ['#c24226','#d15a39',"four"],
    ['#c1c341','#d0d25c',"five"],
    ['#3f78c3','#5591d2',"six"]
  ],

  defaultOpts: {
    id: '',   //Note的 id
    $ct: $('#content').length>0?$('#content'):$('body'),  //默认存放 Note 的容器
    time:new Date().toLocaleString('chinese',{hour12:false}),
    context: 'input here',  //Note 的内容
    username:"Me"
  },

  initOpts: function (opts) {
    this.defaultOpts.time = new Date().toLocaleString('chinese',{hour12:false})
    this.opts = $.extend({}, this.defaultOpts, opts||{});
    if(this.opts.id){
       this.id = this.opts.id;
    }
  },

  createNote: function () {
    // console.log("options",this.opts)
    var tpl =  '<div class="note">'
              + '<div class="note-head"><span class="delete fa fa-close"></span></div>'
              + '<div class="note-ct" contenteditable="true"></div>'
              + "<div class='note-info'>"
              + '<span class="username"></span><span class="note-time"></span>'
              + "</div>"
              +'</div>';
    this.$note = $(tpl);
    this.$note.find('.note-ct').html(this.opts.context);
    this.$note.find(".note-time").html(this.opts.time)
    this.$note.find(".username").html(this.opts.username)
    if($(".loginName").text() === this.opts.username ){
      this.$note.find(".username").addClass("hl")
    }
    this.opts.$ct.append(this.$note);
    if(!this.id)  this.$note.css('left', '10px');  //新增放到右边
  },

  setStyle: function () {
    var color = this.colors[Math.floor(Math.random()*1)];
    this.$note.find('.note-head').css('background-color', color[0]);
    this.$note.find('.note-ct').addClass(color[2]).css('background-color', color[1]);
    this.$note.find(".note-time").css('background-color', color[1])
  },

  setLayout: function(){
    var self = this;
    if(self.clk){
      clearTimeout(self.clk);
    }
    self.clk = setTimeout(function(){
      Event.fire('waterfall');
    },100);
  },

  bindEvent: function () {
    var self = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete');
        beforeContent =  $noteCt.html()
    $delete.on('click', function(){
      self.delete();
    })

    //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
    $noteCt.on('focus', function() {
     
      if($noteCt.html()=='input here') $noteCt.html('');
      $noteCt.data('before', $noteCt.html());
    }).on('blur paste', function() {
      if( $noteCt.data('before') != $noteCt.html() ) {
        $noteCt.data('before',$noteCt.html());
        self.setLayout();
        if(self.id){
          self.edit($noteCt.html())
        }else{
          self.add($noteCt.html())
        }
      }
    });

    //设置笔记的移动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
          evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX-$('.draggable').data('evtPos').x
      });
    });
  },

  edit: function (msg) {
    var self = this;
    
    $.post('/api/notes/edit',{
        id: this.id,
        note: msg
      }).done(function(ret){
      if(ret.status === 0){
        Toast('更新成功');
      }else{
        self.$note.find('.note-ct').html(self.opts.context)
        // $noteCt.html(beforeNoteCont)
        // console.log("edit 在这里")
        Toast(ret.errorMsg,1000,"error");
      }
    })
  },

  add: function (msg){
    console.log('addd...');
    var self = this;
    $.post('/api/notes/add', {note: msg,time:self.opts.time})
      .done(function(ret){
        if(ret.status === 0){
          Toast('成功添加');
        }else{
          self.$note.remove();
          Event.fire('waterfall')
          Toast(ret.errorMsg,1000,"error");
        }
      });
    //todo
  },

  delete: function(){
    var self = this;
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Toast('删除成功');
          self.$note.remove();
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg,1000,"error");
        }
    });

  }

};

module.exports.Note = Note;

