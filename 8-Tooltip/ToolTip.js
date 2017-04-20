(function () {

  var Tooltip = function (selector, opt) {

    this.selector = selector;
    this.options = {
      'tip': 'This is a tip!',
      'position': 'top',
      'duration': 1000,
      'animation': 'zoomIn'  // fade fadeInDown rotate zoomIn
    };
    this.els = new Array();


    if (this.selector) {
      this.els = document.querySelectorAll(this.selector);
    } else {
      console.assert(this.selector === "", "no selector select!");
    }

    if (opt && typeof opt === 'object') {
      for (var key in opt) {
        this.options[key] = opt[key];
      }
    }


    // 创建tooltip的DIV
    this.tooltipDiv = document.createElement('div');
    this.tooltipDiv.className = 'tooltip';
    this.arrow = document.createElement('div');
    this.arrow.className = 't-arrow';
    this.content = document.createElement('span');
    this.content.className = 't-content';
    this.tooltipDiv.appendChild(this.content);
    this.tooltipDiv.appendChild(this.arrow);

    document.body.appendChild(this.tooltipDiv);

    this.tooltipDiv.style.opacity = '0';

    // 每一个el添加mouseover事件
    var that = this;
    for (var i = 0; i < this.els.length; i++) {
      (function (i) {
        that.els[i].addEventListener('mouseover', function (e) {

          if (this.hasAttribute('data-title')) {
            that.options.tip = this.getAttribute('data-title');
          } else if (this.hasAttribute('title')) {
            that.options.tip = this.getAttribute('title');
          } else {
            that.options.tip = 'That is a tip!';
          }


          that.doWidthPosition(this);
          that.doWidthAnimation(this);

        });

      })(i)
    }
  }

  Tooltip.prototype.doWidthPosition = function (obj) {

    var content = document.querySelector('.t-content');
    content.innerHTML = this.options.tip;

    var tooltip = document.querySelector('.tooltip');
    tooltip.style.display = "inline-block";
    var t_width = tooltip.offsetWidth;
    var t_height = tooltip.offsetHeight;

    var arrow = document.querySelector('.t-arrow');
    var a_width = arrow.offsetWidth;
    var a_height = arrow.offsetHeight;

    // 当前控件尺寸
    var X = obj.offsetLeft;
    var Y = obj.offsetTop;

    var el_width = obj.offsetWidth;
    var el_height = obj.offsetHeight;

    if (this.options['position'] == "top") {
      arrow.style.top = t_height;
      arrow.style.left = t_width / 2 - a_width / 2;

      tooltip.style.left = X + el_width / 2 - t_width / 2;
      tooltip.style.top = Y - t_height - a_height - 2;
    } else if (this.options['position'] == "bottom") {
      arrow.style.top = -a_height;
      arrow.style.left = t_width / 2 - a_width / 2;
      arrow.style.transform = 'rotate(180deg)';

      tooltip.style.left = X + el_width / 2 - t_width / 2;
      tooltip.style.top = Y + el_height + a_height;
    } else if (this.options['position'] == "left") {
      arrow.style['transform-origin'] = '0 0';
      arrow.style.transform = 'rotate(-90deg)';
      arrow.style.top = t_height / 2 + a_width / 2;
      arrow.style.left = t_width - 1;

      tooltip.style.left = X - t_width - a_height;
      tooltip.style.top = Y + el_height / 2 - t_height / 2;
    } else if (this.options['position'] == "right") {
      arrow.style['transform-origin'] = '0 0';
      arrow.style.transform = 'rotate(90deg)';
      arrow.style.top = t_height / 2 - a_width / 2;

      tooltip.style.left = X + el_width + a_height;
      tooltip.style.top = Y + el_height / 2 - t_height / 2;
    }


    //tooltip.style.opacity = '1';

    //var that = this;
    //setTimeout(function (e) {
    //  tooltip.style.opacity = '0';
    //  tooltip.style.display = 'none';
    //}, that.options.duration)

  }

  Tooltip.prototype.doWidthAnimation = function () {

    var tooltip = document.querySelector('.tooltip');
    //tooltip.className = 'tooltip' + ' anit-fadeInDown';

    //tooltip.className = 'tooltip' + ' anti-fadeIn';

    //tooltip.className = 'tooltip' + ' anti-rotate';

    //tooltip.className = 'tooltip' + ' anti-zoomIn';

    var animate = this.options.animation;

    if(animate == "fade") {
      tooltip.className = 'tooltip' + ' anti-fadeIn';
    } else if (animate == "fadeInDown") {
      tooltip.className = 'tooltip' + ' anit-fadeInDown';
    } else if (animate == "rotate") {
      tooltip.className = 'tooltip' + ' anti-rotate';
    } else {
      tooltip.className = 'tooltip' + ' anti-zoomIn';
    }

    var that = this;
    setTimeout(function (e) {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    }, that.options.duration)
  }

  window.Tooltip = Tooltip;
})()