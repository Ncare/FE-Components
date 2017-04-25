(function(){

  var DatePicker = function(opt) {

    this.options = {
      'position': 'top'
    }

    this.weekID = ['日', '一', '二', '三', '四', '五', '六'];
    this.init().addDate();
  }

  DatePicker.prototype.init = function() {
    this.datepicker = this.createDOM('<div class="datepicker"></div>');
    this.datepicker_header = this.createDOM('<div class="datepicker-header"></div>');
    this.datepicker_body = this.createDOM('<div class="datepicker-body"></div>');

    this.datepicker.appendChild(this.datepicker_header);
    this.datepicker.appendChild(this.datepicker_body);
    document.body.appendChild(this.datepicker);

    return this;
  }

  DatePicker.prototype.addDate = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();

    var prev = this.createDOM('<span class="picker-prev">&lt; </span>');
    var yearLabel = this.createDOM('<span class="picker-year-label">'+year+'年</span>')
    var monthLabel = this.createDOM('<span class="picker-month-label">'+month+'月</span>');
    var next = this.createDOM('<span class="picker-next">&gt; </span>')

    this.datepicker_header.appendChild(prev);
    this.datepicker_header.appendChild(yearLabel);
    this.datepicker_header.appendChild(monthLabel);
    this.datepicker_header.appendChild(next);

    var dayPart = this.createDOM('<div class="day-picker"></div>');
    var monthPart = this.createDOM('<div class="month-picker"></div>');
    var yearPart = this.createDOM('<div class="year-picker"></div>');


    var weekPart= this.createDOM('<div class="week-cell"></div>');
    for(var i=0; i<this.weekID.length; i++) {
      var cell = this.createDOM('<span>'+this.weekID[i]+'</span>');
      weekPart.appendChild(cell);
    }
    dayPart.appendChild(weekPart);

    this.datepicker_body.appendChild(dayPart);
    this.datepicker_body.appendChild(monthPart);
    this.datepicker_body.appendChild(yearPart);

  }

  DatePicker.prototype.createDOM = function(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }


  window.DatePicker = DatePicker;
})()