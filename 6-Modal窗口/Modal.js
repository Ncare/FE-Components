
var Modal = (function() {

  var ModalWindow = function(opt, callback) {

    this.options = {
      'title': '窗口标题',
      'text': '窗口内容, 测试内容，测试内容， 测试内容窗口内容, 测试内容，测试内容， 测试内容',
      'showConfirmButton': true,
      'showCancelButton': true,
    }

    if(opt && typeof opt === 'object') {
      for(var key in opt) {
        this.options[key] = opt[key];
      }
    }


    this.mask = document.createElement('div');
    this.mask.className = 'mask';
    this.modalWindow = document.createElement('div');
    this.modalWindow.id = 'Modal';

    var header = document.createElement('div');
    header.className = 'm-header';
    header.innerHTML = this.options.title;
    this.modalWindow.appendChild(header);

    var content = document.createElement('div');
    content.className = 'm-content';
    content.innerHTML = this.options.text;
    this.modalWindow.appendChild(content);

    var footer = document.createElement('div');
    footer.className = 'm-footer';
    if (this.options.showCancelButton) {
      var cancelBtn = document.createElement('button');
      cancelBtn.className = 'm-cancel';
      cancelBtn.innerHTML = '取消';
      footer.appendChild(cancelBtn);

      var that = this;
      cancelBtn.addEventListener('click', function(){

        that.hide();
      })
    }

    if (this.options.showConfirmButton) {
      var confirmBtn = document.createElement('button');
      confirmBtn.className = 'm-confirm';
      confirmBtn.innerHTML = '确定';
      footer.appendChild(confirmBtn);

      var that = this;
      confirmBtn.addEventListener('click', function(e){
        callback && callback();

        that.hide();
      })
    }

    this.modalWindow.appendChild(footer);

  }


  ModalWindow.prototype.show = function() {
    document.body.appendChild(this.mask);
    
    this.modalWindow.className = 'modalshow';
    document.body.appendChild(this.modalWindow);
  }

  ModalWindow.prototype.hide = function() {
    document.body.removeChild(this.mask);

    var that = this;
    this.modalWindow.className = 'modalhide';
    this.modalWindow.addEventListener('webkitAnimationEnd', function(e){
      document.body.removeChild(that.modalWindow);
    })
  }


  return ModalWindow;
})()