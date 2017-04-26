(function () {

  // 时间扩展
  var dateEX = function (year, month, day) {
    if (!year) {
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
    } else {
      this.year = year;
      this.month = month;
      this.day = day;
    }
  }

  // 某月有多少天
  dateEX.prototype.daysInMonth = function (year, month) {
    month = parseInt(month, 10);
    var temp = new Date(year, month, 0);
    return temp.getDate();
  }

  // 某月上月有多少天
  dateEX.prototype.daysInPrev = function () {

    if (this.month == 1) {
      return this.daysInMonth(this.year - 1, 12);
    } else {
      return this.daysInMonth(this.year, this.month - 1);
    }
  }

  // 当月开始日期
  dateEX.prototype.monthBegin = function () {
    var daysInCurrent = this.daysInMonth(this.year, this.month);
    if (!(this.month - 1)) {
      var daysInPrev = this.daysInMonth(this.year - 1, 12)
    } else {
      var daysInPrev = this.daysInMonth(this.year, this.month - 1);
    }

    //周几
    var newDay = new Date(this.year, this.month - 1);
    var weekDay = newDay.getDay();

    return daysInPrev - weekDay + 1;
  }



  var DatePicker = function (opt) {

    this.options = {
      'el':null,
      'position': 'top',
    }

    this.weekID = ['日', '一', '二', '三', '四', '五', '六'];
    this.status = 'day'; // 处于选择什么内容的状态, 'month', 'year'
    this.pickDay = new dateEX();

    if(opt && typeof opt === 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];
      }
    }

    // 判断el 是否是input标签
    if(this.options.el == null) { return }
    var tagName = this.options.el.nodeName;
    console.assert(tagName == 'INPUT', '不是使用的是input标签！')

    

    this.init().addDate();

    this.updateDate();
    this.updateMonth();
    this.updateYear();

    this.bindEvents();

    this.moveToPosition();

    return this;
  }

  DatePicker.prototype.init = function () {
    this.datepicker = this.createDOM('<div class="datepicker"></div>');
    this.datepicker_header = this.createDOM('<div class="datepicker-header"></div>');
    this.datepicker_body = this.createDOM('<div class="datepicker-body"></div>');

    this.datepicker.appendChild(this.datepicker_header);
    this.datepicker.appendChild(this.datepicker_body);
    document.body.appendChild(this.datepicker);

    return this;
  }

  DatePicker.prototype.addDate = function () {

    var prev = this.createDOM('<span class="picker-prev">&lt; </span>');
    this.yearLabel = this.createDOM('<span class="picker-year-label">' + this.pickDay.year + '年</span>')
    this.monthLabel = this.createDOM('<span class="picker-month-label">' + this.pickDay.month + '月</span>');
    var next = this.createDOM('<span class="picker-next">&gt; </span>')

    this.datepicker_header.appendChild(prev);
    this.datepicker_header.appendChild(this.yearLabel);
    this.datepicker_header.appendChild(this.monthLabel);
    this.datepicker_header.appendChild(next);

    this.dayPart = this.createDOM('<div class="day-picker"></div>');
    this.monthPart = this.createDOM('<div class="month-picker"></div>');
    this.yearPart = this.createDOM('<div class="year-picker"></div>');


    // 初始化天
    var weekLine = this.createDOM('<div class="week-cell"></div>');
    for (var i = 0; i < this.weekID.length; i++) {
      var cell = this.createDOM('<span>' + this.weekID[i] + '</span>');
      weekLine.appendChild(cell);
    }
    this.dayLine = this.createDOM('<div class="day-cell"></div>');

    this.dayPart.appendChild(weekLine);
    this.dayPart.appendChild(this.dayLine);


    this.monthPart.style.display = 'none';
    this.yearPart.style.display = 'none';

    this.datepicker_body.appendChild(this.dayPart);
    this.datepicker_body.appendChild(this.monthPart);
    this.datepicker_body.appendChild(this.yearPart);

  }

  DatePicker.prototype.updateDate = function () {

    var monthBegin = this.pickDay.monthBegin();
    var daysInPrev = this.pickDay.daysInPrev();

    var daysInMonth = this.pickDay.daysInMonth(this.pickDay.year, this.pickDay.month);

    this.dayLine.innerHTML = '';

    for (var i = monthBegin; i <= daysInPrev; i++) {
      var cell = this.createDOM('<span>' + i + '</span>');
      cell.className = 'prev-month';
      this.dayLine.appendChild(cell);
    }

    for (var i = 1; i <= daysInMonth; i++) {
      var cell = this.createDOM('<span>' + i + '</span>');
      this.dayLine.appendChild(cell);
    }

    // daysInNextResidual 下月在当前月显示的天数
    var daysInNextResidual = 7 - (daysInPrev - monthBegin + 1 + daysInMonth) % 7;

    for (var i = 1; i <= daysInNextResidual; i++) {
      var cell = this.createDOM('<span>' + i + '</span>');
      cell.className = 'next-month';
      this.dayLine.appendChild(cell);
    }

  }

  DatePicker.prototype.updateMonth = function () {

    var month = this.pickDay.month;

    this.monthPart.innerHTML = '';

    for (var i = 1; i <= 12; i++) {
      var cell = this.createDOM('<span>' + i + '月</span>');
      if (month == i) {
        cell.className = 'selected'
      }
      this.monthPart.appendChild(cell);

    }
  }

  DatePicker.prototype.updateYear = function () {

    var year = this.pickDay.year;

    this.yearPart.innerHTML = '';

    var yearStart = parseInt(year / 10) * 10;
    for (var i = yearStart; i < yearStart + 10; i++) {
      var cell = this.createDOM('<span>' + i + '</span>');
      if (i == year) {
        cell.className = 'selected'
      }
      this.yearPart.appendChild(cell);
    }


  }


  // 绑定点击事件
  DatePicker.prototype.bindEvents = function () {

    var that = this;
    
    // 顶栏点击事件
    this.datepicker_header.addEventListener('click', function (e) {
      var target = e.target;
      if (target.matches('span.picker-prev')) {

        if (that.status == 'day') {
          if (that.pickDay.month == 1) {
            that.pickDay.year = that.pickDay.year - 1;
            that.pickDay.month = 12;
            that.yearLabel.innerHTML = that.pickDay.year + '年';
            that.monthLabel.innerHTML = that.pickDay.month + '月';
          } else {
            that.pickDay.month = that.pickDay.month - 1;
            that.monthLabel.innerHTML = that.pickDay.month + '月';
          }

          that.updateDate();
        } else if (that.status == 'month') {
          that.pickDay.year = that.pickDay.year - 1;
          that.yearLabel.innerHTML = that.pickDay.year + '年';
          that.updateYear();

        } else if (that.status == 'year') {
          that.pickDay.year = that.pickDay.year - 10;
          var yearStart = parseInt(that.pickDay.year / 10) * 10;
          var yearEnd = yearStart + 9;
          that.yearLabel.innerHTML = yearStart + '年-' + yearEnd + '年';

          that.updateYear();
        }

      }

      if (target.matches('span.picker-next')) {

        if (that.status == 'day') {
          if (that.pickDay.month == 12) {
            that.pickDay.year = that.pickDay.year + 1;
            that.pickDay.month = 1;
            that.yearLabel.innerHTML = that.pickDay.year + '年';
            that.monthLabel.innerHTML = that.pickDay.month + '月';
          } else {
            that.pickDay.month = that.pickDay.month + 1;
            that.monthLabel.innerHTML = that.pickDay.month + '月';
          }

          that.updateDate();
        }else if (that.status == 'month') {
          that.pickDay.year = that.pickDay.year + 1;
          that.yearLabel.innerHTML = that.pickDay.year + '年';
          that.updateYear();

        } else if (that.status == 'year') {
          that.pickDay.year = that.pickDay.year + 10;
          var yearStart = parseInt(that.pickDay.year / 10) * 10;
          var yearEnd = yearStart + 9;
          that.yearLabel.innerHTML = yearStart + '年-' + yearEnd + '年';

          that.updateYear();
        }

      }

      if (target.matches('span.picker-year-label')) {

        // 号 选择
        if (that.status == 'day') {
          that.dayPart.style.display = 'none';
          that.monthPart.style.display = 'none';
          that.yearPart.style.display = 'block';

          var year = that.pickDay.year;
          var yearStart = parseInt(year / 10) * 10;
          var yearEnd = yearStart + 9;
          that.yearLabel.innerHTML = yearStart + '年-' + yearEnd + '年';
          that.monthLabel.style.display = 'none'

          that.status = 'year';

        } else if (that.status == 'month') {

          that.dayPart.style.display = 'none';
          that.monthPart.style.display = 'none';
          that.yearPart.style.display = 'block';

          var year = that.pickDay.year;
          var yearStart = parseInt(year / 10) * 10;
          var yearEnd = yearStart + 9;
          that.yearLabel.innerHTML = yearStart + '年-' + yearEnd + '年';
          that.monthLabel.style.display = 'none'

          that.status = 'year';
        }
      }

      if (target.matches('span.picker-month-label')) {

        if (that.status == 'day') {
          that.dayPart.style.display = 'none';
          that.monthPart.style.display = 'block';
          that.yearPart.style.display = 'none';

          that.monthLabel.style.display = 'none';
          that.status = 'month';

        }

      }

    })


    // 日期选择区域点击事件
    this.datepicker_body.addEventListener('click', function(e) {

      var target = e.target;

      if(target.matches('.day-cell span')) {
        if(target.matches('span.prev-month')) {
          if(that.pickDay.month == 1) {
            that.pickDay.year = that.pickDay.year - 1;
            that.pickDay.month = 12;
          }else{
            that.pickDay.month = that.pickDay.month - 1;
          }

          that.pickDay.day = parseInt(target.innerHTML);
        } else if(target.matches('span.next-month')) {
          if(that.pickDay.month == 12) {
            that.pickDay.year = that.pickDay.year + 1;
            that.pickDay.month = 1;
          }else{
            that.pickDay.month = that.pickDay.month + 1;
          }

          that.pickDay.day = parseInt(target.innerHTML);
        } else {

          that.pickDay.day = parseInt(target.innerHTML);
        }

        var selectedDate = that.pickDay.year + ' - ' + that.pickDay.month + ' - ' + that.pickDay.day;
        that.options.el.dispatchEvent(new CustomEvent('dateSelected', {detail: { selectedDate }}));
      } 

      if(target.matches('.month-picker span')) {
        
        that.pickDay.month = parseInt(target.innerHTML);
        that.monthLabel.innerHTML = target.innerHTML;
        that.monthLabel.style.display = 'inline';

        that.dayPart.style.display = 'block';
        that.monthPart.style.display = 'none';
        that.yearPart.style.display = 'none';

        that.status = 'day';
        that.updateDate();
      }

      if(target.matches('.year-picker span')) {
        that.pickDay.year = parseInt(target.innerHTML);
        that.yearLabel.innerHTML = target.innerHTML + '年';

        that.dayPart.style.display = 'none';
        that.monthPart.style.display = 'block';
        that.yearPart.style.display = 'none';

        that.status = 'month';
      }


    })
  }

  // 移动到制定位置
  DatePicker.prototype.moveToPosition = function() {

    var el = this.options.el;

    var el_X = el.offsetLeft;
    var el_Y = el.offsetTop;
    var el_width = el.offsetWidth;
    var el_height = el.offsetHeight;

    this.datepicker.style.top = el_Y + el_height;
    this.datepicker.style.left = el_X;
  }


  DatePicker.prototype.createDOM = function (str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
  }


  window.DatePicker = DatePicker;
})()