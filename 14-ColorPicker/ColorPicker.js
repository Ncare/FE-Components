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
                        '<label>H <input type="text" id="h"> 度</label>' +
                        '<label>S <input type="text" id="s"> %</label>' + 
                        '<label>B <input type="text" id="b"> %</label>' + 
                        '<label>R <input type="text" id="r"> </label>' +
                        '<label>G <input type="text" id="g"> </label>' + 
                        '<label>B <input type="text" id="b"> </label>' +
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

  ColorPicker.prototype.creatDOM = function (str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }

  window.ColorPicker = ColorPicker;
})()