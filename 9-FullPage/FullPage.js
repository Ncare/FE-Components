(function(){

  var FullPage = function(opt) {

    this.options = {
      el: '',
      duration: '1s'
    }

    if(opt && typeof opt == 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];
      }
    }
  }

  window.FullPage = FullPage;
})()