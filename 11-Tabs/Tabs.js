(function(){

  var Tabs = function(opt) {

    this.options = {
      'el': null,
      'tabSelector': '.tabs-nav',
      'panelSelector': '.tabs-panel'
    }

    if(opt && typeof opt == 'object') {
      for(var key in opt) {
        this.options[key] = opt[key]
      }
    }

    console.assert(this.options.el != null, '未选择有效标签!');

    this.bindEvents().setDefault();

    return this;
    
  }

  Tabs.prototype.bindEvents = function() {
    
    var that = this;
    this.options.el.addEventListener('click', function(e){
      var target = e.target;

      if(target.matches('.tabs-nav>div')) {

        // 清除原有active
        var children = target.parentNode.children;
        var index = 0;
        for(var i=0; i<children.length; i++) {
          children[i].className = '';
          if(children[i] == target) {
            index = i;
          }
        }

        target.className = 'active';

        var panelChild = that.options.el.querySelector(that.options.panelSelector).children;
        for(var j=0; j<panelChild.length; j++) {
          panelChild[j].style.display = 'none';
          if(index == j) {
            panelChild[j].style.display = 'block';
          }
        }
      }
    })

    return this;
  }

  Tabs.prototype.setDefault = function() {
    this.options.el.querySelector(this.options.tabSelector + '>div:first-child').click();
  }

  window.Tabs = Tabs;
})()