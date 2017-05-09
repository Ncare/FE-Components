(function () {

  var ColorPicker = function (opt) {

    this.options = {
      'el': null
    }

    if (opt && typeof opt === 'object') {
      for (var key in opt) {
        this.options[key] = opt[key];
        0
      }
    }

    //if(this.options.el === null) { return }

    this.init();

    this.curColor = new Color({
      h: 220,
      s: 0.2,
      v: 0.8
    });
    this.curColor.hsv2rgb();
    this.curColor.rgb2hex();
    this.showColor();

    this.bindEvents();
  }


  ColorPicker.prototype.init = function () {

    this.colorPicker = this.creatDOM('<div class="colorpicker"></div>');
    this.color_area = this.creatDOM('<div class="color-area"></div>');
    this.color_bar = this.creatDOM('<div class="color-bar"></div>');
    this.color_num = this.creatDOM('<div class="color-num" ></div>');

    // insert SVG
    var linear = '<svg  xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" version="1.1">' +
      '<defs>' +
      '<linearGradient id="gradient-black" x1="0%" y1="100%" x2="0%" y2="0%">' +
      '<stop offset="0%" stop-color="#000000" stop-opacity="1"></stop>' +
      '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>' +
      '</linearGradient>' +
      '<linearGradient id="gradient-white" x1="0%" y1="100%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#ffffff" stop-opacity="1"></stop>' +
      '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-white)"></rect>' +
      '<rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-black)"></rect>' +
      '</svg>';

    var bar = '<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="300px" version="1.1">' +
      '<defs>' +
      '<linearGradient id="gradient-hsv" x1="0%" y1="100%" x2="0%" y2="0%">' +
      '<stop offset="0%" stop-color="#ff0000" stop-opacity="1"></stop>' +
      '<stop offset="8%" stop-color="#ff7f00" stop-opacity="1"></stop>' +
      '<stop offset="17%" stop-color="#ffff00" stop-opacity="1"></stop>' +
      '<stop offset="25%" stop-color="#80ff00" stop-opacity="1"></stop>' +
      '<stop offset="33%" stop-color="#00ff00" stop-opacity="1"></stop>' +
      '<stop offset="42%" stop-color="#00ff80" stop-opacity="1"></stop>' +
      '<stop offset="50%" stop-color="#00ffff" stop-opacity="1"></stop>' +
      '<stop offset="58%" stop-color="#0080ff" stop-opacity="1"></stop>' +
      '<stop offset="67%" stop-color="#0000ff" stop-opacity="1"></stop>' +
      '<stop offset="75%" stop-color="#8000ff" stop-opacity="1"></stop>' +
      '<stop offset="83%" stop-color="#ff00ff" stop-opacity="1"></stop>' +
      '<stop offset="92%" stop-color="#ff007f" stop-opacity="1"></stop>' +
      '<stop offset="100%" stop-color="#ff0000" stop-opacity="1"></stop>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect width="30px" height="300px" fill="url(#gradient-hsv)"></rect>' +
      '</svg>';


    var hsb_rgb_str = '<div class="nums">' +
      '<label>H <input type="text" id="h" maxlength="3"> 度</label>' +
      '<label>S <input type="text" id="s" maxlength="3"> %</label>' +
      '<label>V <input type="text" id="v" maxlength="3"> %</label>' +
      '<label>R <input type="text" id="r" maxlength="3"> </label>' +
      '<label>G <input type="text" id="g" maxlength="3"> </label>' +
      '<label>B <input type="text" id="b" maxlength="3"> </label>' +
      '<label># <input type="text" id="hex"> <button class="copy">复制</button></label>' +
      '</div>';

    this.color_area.appendChild(this.creatDOM(linear));
    this.color_indicator = this.creatDOM('<div class="color-indicator"></div>');
    this.color_area.appendChild(this.color_indicator);


    this.color_bar.appendChild(this.creatDOM(bar));
    this.color_slider = this.creatDOM('<div class="color-slider"></div>');
    this.color_bar.appendChild(this.color_slider);

    this.hsb_rgb = this.creatDOM(hsb_rgb_str);
    this.color_num.appendChild(this.hsb_rgb);

    this.cur_color = this.creatDOM('<div class="cur_color"></div>');
    this.colorPicker.appendChild(this.cur_color);

    this.colorPicker.appendChild(this.color_area);
    this.colorPicker.appendChild(this.color_bar);
    this.colorPicker.appendChild(this.color_num);
    document.body.appendChild(this.colorPicker);

  }

  ColorPicker.prototype.showColor = function() {
    document.getElementById('h').value = parseInt(this.curColor.h);
    document.getElementById('s').value = parseInt(this.curColor.s * 100);
    document.getElementById('v').value = parseInt(this.curColor.v * 100);
    document.getElementById('r').value = this.curColor.r;
    document.getElementById('g').value = this.curColor.g;
    document.getElementById('b').value = this.curColor.b;
    document.getElementById('hex').value = this.curColor.hex;

    var colorBase = new Color({h: this.curColor.h, s: 1., v: 1});
    colorBase.hsv2rgb();
    colorBase.rgb2hex();
    this.color_area.style.backgroundColor = '#' + colorBase.hex;
    this.cur_color.style.backgroundColor = '#' + this.curColor.hex;
    
    this.color_slider.style.top = ((360-this.curColor.h)/360*this.color_bar.offsetHeight - this.color_slider.offsetHeight/2) + 'px';
    this.color_indicator.style.left = (this.curColor.s * this.color_area.offsetWidth - this.color_indicator.offsetWidth/2) + 'px';
    this.color_indicator.style.top = ((1-this.curColor.v)*this.color_area.offsetHeight - this.color_indicator.offsetHeight/2) + 'px';

  }

  ColorPicker.prototype.bindEvents = function () {
    
    // 数据框的响应
    var that = this;

    var input = document.querySelector(".nums");
    EventHelper.addHandler(input, 'change', function(e) {
      var target = e.target;
      if(target == document.getElementById('h')) { 
        var temp = parseInt(target.value);
        if(temp <= 360) {
          that.curColor.h = temp;
          that.curColor.hsv2rgb();
          that.curColor.rgb2hex();
          that.showColor();
        }else{
          alert("输入0~360之间的数字");
        }
      } else if(target == document.getElementById('s')) {
        var temp = parseInt(target.value)/100;
        if(temp <= 1) {
          that.curColor.s = temp;
          that.curColor.hsv2rgb();
          that.curColor.rgb2hex();
          that.showColor();
        } else {
          alert("输入0~100之间的数字")
        }      
      } else if(target == document.getElementById('v')) {
        var temp= parseInt(target.value)/100;
        if(temp <= 1) {
          that.curColor.v = temp;
          that.curColor.hsv2rgb();
          that.curColor.rgb2hex();
          that.showColor();
        } else {
          alert("输入0~100之间的数字")
        }  
      } else if(target == document.getElementById('r')) {
        var temp = parseInt(target.value);
        if(temp <= 255) {
          that.curColor.r = temp;
          that.curColor.rgb2hsv();
          that.curColor.rgb2hex();
          that.showColor();
        } else {
          alert("输入0~255之间的数字")
        }  
      } else if(target == document.getElementById('g')) {
        var temp = parseInt(target.value);
        if(temp <= 255) {
          that.curColor.g = temp;
          that.curColor.rgb2hsv();
          that.curColor.rgb2hex();
          that.showColor();
        } else {
          alert("输入0~255之间的数字")
        }  
      } else if(target == document.getElementById('b')) {
        var temp = parseInt(target.value);
        if(temp <= 255) {
          that.curColor.b = temp;
          that.curColor.rgb2hsv();
          that.curColor.rgb2hex();
          that.showColor();
        } else {
          alert("输入0~255之间的数字")
        }  
      } else if(target == document.getElementById('hex')) {
        temp = document.getElementById('hex').value;
        if(parseInt(temp, 16) <= parseInt('ffffff', 16) && parseInt(temp, 16) >= 0) {
          that.curColor.hex = temp;
          that.curColor.hex2rgb();
          that.curColor.rgb2hsv();
          that.showColor();
        } else {
          alert("输入000000-ffffff之间的数值")
        }  
      } 
    })

    // 拖拽响应
    this.Dragging(this.color_area, this.indicatorListener(this.curColor));
    this.Dragging(this.color_bar, this.sliderListener(this.curColor));
  }

  ColorPicker.prototype.Dragging = function(el, listener) {
    var mousedown = false;
    var that = this;
    // 鼠标按下
    EventHelper.addHandler(el, 'mousedown', function(e){
      mousedown = true;
      if(mousedown) {
        listener(e);
      }
    })

    EventHelper.addHandler(el, 'mouseup', function(e){
      mousedown = false;
    })

    EventHelper.addHandler(el, 'mouseout', function(e){
      mousedown = false;
    })

    // 鼠标拖动
    EventHelper.addHandler(el, 'mousemove', function(e) {
      console.log("....")
      if(mousedown) {
        listener(e);
      } 
    })
  }

  ColorPicker.prototype.indicatorListener = function(color) {
    var that = this;
    return function(e) {
      var mouse = {x: e.offsetX, y: e.offsetY};
      var area = {width:　that.color_area.offsetWidth, height: that.color_area.offsetHeight};
      color.s = mouse.x / area.width;
      color.v = (area.height - mouse.y) / area.height;
      color.hsv2rgb();
      color.rgb2hex();
      that.showColor(color);
      that.color_indicator.style.top = (mouse.y - that.color_indicator.offsetHeight/2) + 'px';
      that.color_indicator.style.left = (mouse.x - that.color_indicator.offsetWidth/2) + 'px';
    }
  }

  ColorPicker.prototype.sliderListener = function(color) {
    var that = this;
    return function(e) {
      var mouse = {x: e.offsetX, y: e.offsetY};
      var area = {width: that.color_bar.offsetWidth, height: that.color_bar.offsetHeight};
      color.h = (1- mouse.y / area.height) * 360;
      color.hsv2rgb();
      color.rgb2hex();
      that.showColor();
      that.color_slider.style.top = (mouse.y - that.color_slider.offsetHeight/2) + 'px';
    }
  }


  ColorPicker.prototype.creatDOM = function (str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }


  // 事件工具
  var EventHelper = {
    
    addHandler: function(el, type, handler) {
      if(el.addEventListener) {
        el.addEventListener(type, handler, false);
      }else if(el.attachEvent) {
        el.attachEvent("on" + type, handler);
      }else {
        el["on" + type] = handler;
      }
    },

    removeHandler: function(el, type, handler) {
      if(el.removeEventListener) {
        el.removeEventListener(type, handler, false);
      }else if(el.detachEvent) {
        el.detachEvent("on" + type, handler);
      }else {
        el["on" + type] = handler;
      }
    }
  }

  // color 对象
  function Color(color) {
    if (typeof color.h == 'number') {
      this.h = color.h;
      this.s = color.s;
      this.v = color.v;
    }

    if (typeof color.r == 'number') {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
    }

    if (typeof color.hex == 'String') {
      this.hex = color.hex;
    }
  }

  // copy by others' code;
  Color.prototype = {
    constructor: Color,
    hsv2rgb: function () {
      v = this.v;
      h = Math.floor(this.h / 60) % 6;
      f = this.h / 60 - h;
      p = this.v * (1 - this.s);
      q = this.v * (1 - f * this.s);
      t = this.v * (1 - (1 - f) * this.s);
      R = [v, q, p, p, t, v][h];
      G = [t, v, v, q, p, p][h];
      B = [p, p, t, v, v, q][h];
      r = Math.round(R * 255);
      g = Math.round(G * 255);
      b = Math.round(B * 255);
      this.r = r;
      this.g = g;
      this.b = b;
    },

    rgb2hsv: function () {
      var r = this.r / 255,
        b = this.b / 255,
        g = this.g / 255;
      var h, s, v;
      v = Math.max(r, g, b);
      min = Math.min(r, g, b);
      s = v == 0 ? 0 : (v - min) / v;
      if (v == min) {
        h = 0;
      } else if (v == r && g >= b) {
        h = 60 * (g - b) / (v - min);
      } else if (v == r && g < b) {
        h = 60 * (g - b) / (v - min) + 360;
      } else if (v == g) {
        h = 60 * (b - r) / (v - min) + 120;
      } else if (v == b) {
        h = 60 * (r - g) / (v - min) + 240;
      }
      this.h = h;
      this.s = s;
      this.v = v;
    },

    rgb2hex: function () {
      var r16, g16, b16;
      if (this.r > 15) {
        r16 = this.r.toString(16);
      } else {
        r16 = '0' + this.r.toString(16);
      }
      if (this.g > 15) {
        g16 = this.g.toString(16);
      } else {
        g16 = '0' + this.g.toString(16);
      }
      if (this.b > 15) {
        b16 = this.b.toString(16);
      } else {
        b16 = '0' + this.b.toString(16);
      }
      this.hex = r16 + g16 + b16;
    },

    hex2rgb: function () {
      var r16, g16, b16;
      r16 = this.hex.slice(0, 2);
      this.r = parseInt(r16, 16);
      g16 = this.hex.slice(2, 4);
      this.g = parseInt(g16, 16);
      b16 = this.hex.slice(4);
      this.b = parseInt(b16, 16);
    }
  }

  window.ColorPicker = ColorPicker;
})()