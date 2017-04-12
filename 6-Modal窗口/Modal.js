
var Modal = (function() {

  var ModalWindow = function(opt) {

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
    this.modalWindow.className = 'Modal';

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
    }

    if (this.options.showConfirmButton) {
      var confirmBtn = document.createElement('button');
      confirmBtn.className = 'm-confirm';
      confirmBtn.innerHTML = '确定';
      footer.appendChild(confirmBtn);
    }

    
    this.modalWindow.appendChild(footer);


    document.body.appendChild(this.mask);
    document.body.appendChild(this.modalWindow);
  }

  return ModalWindow;
})()