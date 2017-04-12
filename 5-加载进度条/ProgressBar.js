

var ProgressBar = (function(){


  var progressbar = function(opt, selector) {

    this.progress = 0;
    this.options = {
      'id': 'progress-bar',
      'color': '#49f',
      'height': '2px',
      'duration': '0.5s',
      'position': 'top'
    }

    if(opt && typeof opt === 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];
      }
    }

    this.progressBar = document.createElement('div');
    this.progressBar.id = this.options.id;
    this.progressBar.setCSS = function(style) {
      for(var key in style) {
        this.style[key] = style[key];
      }
    }

    this.progressBar.setCSS({
      'position': selector ? 'relative' : 'fixed', 
      'top': this.options.position === 'top' ? '0' : 'auto',
      'bottom': this.options.position === 'bottom' ? '0' : 'auto',
      'left': '0',
      'right': '0',
      'width': '0%',
      'background-color': this.options.color,
      'height': this.options.height,
      'transition': 'width ' + this.options.duration
    })

    if(selector) {
      var el = document.querySelector(selector);
      if(el) {
        if(el.hasChildNodes()) {
          el.insertBefore(this.progressBar, el.firstChild);
        }else{
          el.appendChild(this.progressBar);
        }
      }
    } else {
      document.body.appendChild(this.progressBar);
    }
  }

  progressbar.prototype.transit = function() {
    this.progressBar.style.width = this.progress + '%';
  }

  progressbar.prototype.setProgress = function(progress, callback) {
    this.show();
    if(progress > 100) {
      this.progress = 100;
    } else if(progress < 0) {
      this.progress = 0
    } else {
      this.progress = progress;
    } 

    this.transit();
    callback && callback();
  }

  progressbar.prototype.increase = function(toBeIncreaseProgress, callback) {
    this.show();
    this.setProgress(this.progress + toBeIncreaseProgress, callback);
  }

  progressbar.prototype.decrease = function(toBeDecreaseProgress, callback) {
    this.show();
    this.setProgress(this.progress + toBeDecreaseProgress, callback);
  }

  progressbar.prototype.start = function() {
    
    var that = this;
    var timer = setInterval(function(e){
      that.increase(5);
      if(that.progress >= 100) {
        clearInterval(timer);
        that.finish();
      }
    }, 200)
  }

  progressbar.prototype.finish = function(callback) {
    
    var that = this;
    this.setProgress(100, callback);
    setTimeout(function(e){
      that.hide();
    }, 1000)

    TransitionEvent && this.progressBar.removeEventListener(TransitionEvent, function(e){
      that.reset();
      that.progressBar.removeEventListener(e.type, arguments.callee);
    })
  }

  progressbar.prototype.reset = function() {
    this.progress = 0;
    this.transit();

    callback && callback();
  }

  progressbar.prototype.show = function() {
    this.progressBar.style.opacity = 1;
  }

  progressbar.prototype.hide = function() {
    this.progressBar.style.opacity = 0;
  }

  return progressbar;
})()