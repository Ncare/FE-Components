(function(){

  var ColorPicker = function(opt) {

    this.options = {
      'el': null
    }

    if(opt && typeof opt === 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];0
      }
    }

    //if(this.options.el === null) { return }

    this.init();
  }


  ColorPicker.prototype.init = function () {   

    this.colorPicker = this.creatDOM('<div class="colorpicker"></div>');
    this.color_area = this.creatDOM('<div class="color-area"></div>');
    this.color_bar = this.creatDOM('<div class="color-bar"></div>');
    this.color_num = this.creatDOM('<div class="color-num"></div>');

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
                      '</defs>'+
                      '<rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-white)"></rect>' +
                      '<rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-black)"></rect>' +
                '</svg>';

   this.color_area.appendChild(this.creatDOM(linear));

   this.color_indicator = this.creatDOM('<div class="color-indicator"></div>');
   this.color_area.appendChild(this.color_indicator);
   

   this.colorPicker.appendChild(this.color_area);
   this.colorPicker.appendChild(this.color_bar);
   this.colorPicker.appendChild(this.color_num);
   document.body.appendChild(this.colorPicker);
  }

  ColorPicker.prototype.creatDOM = function (str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }

  window.ColorPicker = ColorPicker;
})()