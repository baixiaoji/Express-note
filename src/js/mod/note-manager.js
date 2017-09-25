var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');


var NoteManager = (function(){

  function load(str) {
    $.get(str)
      .done(function(ret){
        if(ret.status == 0){
          console.log(ret.data)
          $.each(ret.data, function(idx, el) {
              new Note({
                id: el.id,
                context: el.text,
                time:el.createdAt,
                username:el.username
              });
          });

          Event.fire('waterfall');
        }else{
          Toast(ret.errorMsg);
        }
      })
      .fail(function(){
        Toast('网络异常');
      });
  }
  
  function allLoad() {
    load("/api/notes")
  }
  function personLoad(){
    load("/api/unotes")
  }



  function add(){
    new Note();
  }

  return {
    load: allLoad,
    userLoad:personLoad,
    add: add
  }

})();

module.exports.NoteManager = NoteManager