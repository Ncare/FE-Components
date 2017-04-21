(function(){

  var FullPage = function(opt) {

    this.options = {
      el: '',
      duration: '1s'
    }
    this.currentIndex = 1;
    this.animating = false;           // 动画的时候，不触发滚动

    if(opt && typeof opt == 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];
      }
    }

    if (this.options.el == '') {
      console.assert(this.options.el != '', 'no element to display!')
    }

    var that = this;
    this.options.el.addEventListener('mousewheel', function(e){
      var targetIndex = that.currentIndex + (e.deltaY > 0 ? 1 : -1);
      
      that.goToSection(targetIndex);
    })

  }

  FullPage.prototype.goToSection = function(index) {

    if(this.animating) {
      return ;
    }

    if(index<=0) {
      return ;
    } else if (index > this.options.el.children.length) {
      return ;
    } else {

      this.animating = true;

      var that = this;
      this.options.el.children[0].addEventListener('transitionend', function(){
        this.removeEventListener('transitionend', function(){});
        that.animating = false;
      })

      var sections = this.options.el.children;
      for(var i=0; i<sections.length; i++) {
        var Y = - 100 * (index-1);
        sections[i].style.transform = 'translateY('+Y+'%)';
      }

      this.currentIndex = index;
    }
  }

  window.FullPage = FullPage;
})()