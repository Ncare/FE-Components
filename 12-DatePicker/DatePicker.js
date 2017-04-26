(function(){

  // 时间扩展
  var dateEX = function(year, month, day) {
    if(!year) {
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth()+1;
      this.day = date.getDate();
    }else{
      this.year = year;
      this.month = month;
      this.day = day;
    }
  }

  // 某月有多少天
  dateEX.prototype.daysInMonth = function(year, month) {
    month = parseInt(month, 10);
    var temp = new Date(year, month, 0);
    return temp.getDate();
  }

  // 某月上月有多少天
  dateEX.prototype.daysInPrev = function() {

    if(this.month == 1) {
      return this.daysInMonth(this.year-1, 12);
    }else{
      return this.daysInMonth(this.year, this.month-1);
    }
  }

  // 当月开始日期
  dateEX.prototype.monthBegin = function() {
    var daysInCurrent = this.daysInMonth(this.year, this.month);
    if(!(this.month-1)) {
      var daysInPrev = this.daysInMonth(this.year-1, 12)
    }else{
      var daysInPrev = this.daysInMonth(this.year, this.month-1);
    }

    //周几
    var newDay = new Date(this.year, this.month-1);
    var weekDay = newDay.getDay();

    return daysInPrev - weekDay + 1;
  }

  

  var DatePicker = function(opt) {

    this.options = {
      'position': 'top'
    }

    this.weekID = ['日', '一', '二', '三', '四', '五', '六'];
    this.pickDay = new dateEX();
    this.init().addDate();

    this.updateDate();

    this.bindEvents();
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
    
    var prev = this.createDOM('<span class="picker-prev">&lt; </span>');
    this.yearLabel = this.createDOM('<span class="picker-year-label">'+this.pickDay.year+'年</span>')
    this.monthLabel = this.createDOM('<span class="picker-month-label">'+this.pickDay.month+'月</span>');
    var next = this.createDOM('<span class="picker-next">&gt; </span>')

    this.datepicker_header.appendChild(prev);
    this.datepicker_header.appendChild(this.yearLabel);
    this.datepicker_header.appendChild(this.monthLabel);
    this.datepicker_header.appendChild(next);

    var dayPart = this.createDOM('<div class="day-picker"></div>');
    var monthPart = this.createDOM('<div class="month-picker"></div>');
    var yearPart = this.createDOM('<div class="year-picker"></div>');


    var weekLine= this.createDOM('<div class="week-cell"></div>');
    for(var i=0; i<this.weekID.length; i++) {
      var cell = this.createDOM('<span>'+this.weekID[i]+'</span>');
      weekLine.appendChild(cell);
    }
    this.dayLine = this.createDOM('<div class="day-cell"></div>');

    dayPart.appendChild(weekLine);
    dayPart.appendChild(this.dayLine);

    this.datepicker_body.appendChild(dayPart);
    this.datepicker_body.appendChild(monthPart);
    this.datepicker_body.appendChild(yearPart);

  }

  DatePicker.prototype.updateDate = function() {

    var monthBegin = this.pickDay.monthBegin();
    var daysInPrev = this.pickDay.daysInPrev();

    var daysInMonth = this.pickDay.daysInMonth(this.pickDay.year, this.pickDay.month);

    this.dayLine.innerHTML = '';

    for(var i=monthBegin; i<=daysInPrev; i++) {
      var cell = this.createDOM('<span>'+i+'</span>');
      cell.className = 'prev-month';
      this.dayLine.appendChild(cell);
    }

    for(var i=1; i<=daysInMonth; i++) {
      var cell = this.createDOM('<span>'+i+'</span>');
      this.dayLine.appendChild(cell);
    }

    // daysInNextResidual 下月在当前月显示的天数
    var daysInNextResidual = 7 - (daysInPrev - monthBegin + 1 + daysInMonth) % 7;

    for(var i=1; i<=daysInNextResidual; i++){
      var cell = this.createDOM('<span>'+i+'</span>');
      cell.className = 'next-month';
      this.dayLine.appendChild(cell);
    }
    
  }

  // 绑定点击事件
  DatePicker.prototype.bindEvents = function() {

    var that = this;
    this.datepicker_header.addEventListener('click', function(e){
      var target = e.target;
      if(target.matches('span.picker-prev')) {
        
        if(that.pickDay.month == 1) {
          that.pickDay.year = that.pickDay.year - 1;
          that.pickDay.month = 12;
          that.yearLabel.innerHTML = that.pickDay.year + '年';
          that.monthLabel.innerHTML = that.pickDay.month + '月';
        }else{
          that.pickDay.month = that.pickDay.month - 1;
          that.monthLabel.innerHTML = that.pickDay.month + '月';
        }

        that.updateDate();
        
      }
    })
  }

  

  DatePicker.prototype.createDOM = function(str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }


  window.DatePicker = DatePicker;
})()