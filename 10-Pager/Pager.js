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
    this.bindEvents();
  }

  Pager.prototype.init = function() {
    this.pager = document.createElement('ul');
    this.pager.className = 'pager'
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
        var prev = this.createDOM('<li class="prev disabled">&lt;</li>');
        var p = this.createDOM('<li class="page-active">1</li>');
        this.pager.appendChild(prev);
        this.pager.appendChild(p);
      }else{
        var prev = this.createDOM('<li class="prev">&lt;</li>');
        var p = this.createDOM('<li title="'+(1)+'">1</li>');
        this.pager.appendChild(prev);
        this.pager.appendChild(p);
      }
      

      if(current-3>1){
        var p = this.createDOM('<li class="fastPrev">&hellip;</li>');
        this.pager.appendChild(p);
      }

      if(current-2>1){
        var p = this.createDOM('<li title="'+(current-2)+'">'+(current-2)+'</li>');
        this.pager.appendChild(p);
      }

      if(current-1>1){
        var p = this.createDOM('<li title="'+(current-1)+'">'+(current-1)+'</li>');
        this.pager.appendChild(p);
      }

      if(current!=1 && current!=total) {
        var p = this.createDOM('<li class="page-active" title="'+(current)+'">'+(current)+'</li>');
        this.pager.appendChild(p);
      }

      if(current+1<total){
        var p = this.createDOM('<li title="'+(current+1)+'">'+(current+1)+'</li>');
        this.pager.appendChild(p);
      }

      if(current+2<total){
        var p = this.createDOM('<li title="'+(current+2)+'">'+(current+2)+'</li>');
        this.pager.appendChild(p);
      }

      if(current+3<total){
        var p = this.createDOM('<li class="fastNext">&hellip;</li>');
        this.pager.appendChild(p);
      }

      if(current!=1) {
        if(current==total){
          this.pager.appendChild(this.createDOM('<li class="page-active" title="'+(total)+'">'+total+'</li>'))
        }else{
          this.pager.appendChild(this.createDOM('<li title="'+(total)+'">'+total+'</li>'))
        }
      }

      if(current==total) {
        this.pager.appendChild(this.createDOM('<li class="next disabled">&gt</li>'))
      }else{
        this.pager.appendChild(this.createDOM('<li class="next">&gt</li>'))
      }

    }
  }

  Pager.prototype.bindEvents = function() {

    var that = this;
    this.options.el.addEventListener('click', function(e){
      var element = e.target;

      if(element.hasAttribute('title')) {
        var page = element.getAttribute('title');
        that.goToPage(parseInt(page, 10));
      }

      if(element.matches('li.prev')) {
        that.goToPage(that.options.currentPage-1);
      }

      if(element.matches('li.next')) {
        that.goToPage(that.options.currentPage+1);
      }

      if(element.matches('li.fastPrev')) {
        var page = that.options.currentPage - 5;
        if(page<1) {
          page = 1;
        }
        that.goToPage(page);
      }

      if(element.matches('li.fastNext')) {
        var page = that.options.currentPage + 5;
        if(page>that.options.totalPage) {
          page = that.options.totalPage;
        }
        that.goToPage(page);
      }

    })
  }

  Pager.prototype.goToPage = function(page) {

    if(!page || page === this.options.currentPage || page < 1 || page > this.options.totalPage) {
      return ;
    }

    this.options.currentPage = page;
    this.options.el.dispatchEvent(new CustomEvent('pageChange', {detail: {page} }));
    this.pager.innerHTML = '';
    this.createNum();
  }

  Pager.prototype.createDOM = function(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }




  window.Pager = Pager;

})()