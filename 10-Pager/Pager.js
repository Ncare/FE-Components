(function(){

  var Pager = function(opt) {

    this.options = {
      'el': null,
      'currentPage': 1,
      'totalPage': 1
    }

    this.domSet = {};

    if(opt && typeof opt == 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];
      }
    }

    this.init();
  }

  Pager.prototype.init = function() {
    this.pager = document.createElement('ul');
    this.createNum();

    this.options.el.appendChild(this.pager);
  }

  Pager.prototype.createNum = function() {
    var current = this.options.currentPage;
    var total = this.options.totalPage;

    if(total == 0) {
      this.pager.innerHTML = '';
    }else {
      if(current == 1) {
        var prev = this.createDOM('<li class="prev disbled">&lt;</li>');
        var p = this.createDOM('<li class="page-active">'+current+'</li>');
        this.pager.appendChild(prev);
        this.pager.appendChild(p);
      }else{
        var prev = this.createDOM('<li class="prev">&lt;</li>');
        var p = this.createDOM('<li class="page-active">'+current+'</li>');
        this.pager.appendChild(prev);
        this.pager.appendChild(p);
      }
      

      if(current-3>1){
        var p = this.createDOM('<li class="fastPrev">&laquo;</li>');
        this.pager.appendChild(p);
      }

      if(current-2>1){
        var p = this.createDOM('<li>'+(current-2)+'</li>');
        this.pager.appendChild(p);
      }

      if(current-1>1){
        var p = this.createDOM('<li>'+(current-1)+'</li>');
        this.pager.appendChild(p);
      }

      if(current!=1 && current!=total) {
        var p = this.createDOM('<li class="page-active">'+(current)+'</li>');
        this.pager.appendChild(p);
      }

      if(current+1<total){
        var p = this.createDOM('<li>'+(current+1)+'</li>');
        this.pager.appendChild(p);
      }

      if(current+2<total){
        var p = this.createDOM('<li>'+(current+2)+'</li>');
        this.pager.appendChild(p);
      }

      if(current+3<total){
        var p = this.createDOM('<li class="fastNext">&hellip;</li>');
        this.pager.appendChild(p);
      }

      if(current!=1) {
        if(current==total){
          this.pager.appendChild(this.createDOM('<li class="page-active">'+total+'</li>'))
        }else{
          this.pager.appendChild(this.createDOM('<li>'+total+'</li>'))
        }
      }

      if(current==total) {
        this.pager.appendChild(this.createDOM('<li class="next disabled">&gt</li>'))
      }else{
        this.pager.appendChild(this.createDOM('<li class="next">&gt</li>'))
      }

    }
  }

  Pager.prototype.createDOM = function(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }




  window.Pager = Pager;

})()