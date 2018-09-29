var getRegister = (function () {
    var $form = document.getElementById('form');
    var $usernameInp = $form.username;
    var $passwordInp = $form.password;
    var $btn = $form.btn;
    var $span = document.querySelector('span');
    var $span1 = $form.querySelector('.span1');
    var $span2 = $form.querySelector('.span2');
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var _this = this;
            $usernameInp.addEventListener('change',function(e){
                var flag = true;
                _this.val = $usernameInp.value;
                e = e || window.event;
                console.log(_this.val);
                var reg1 = /^\w{1,15}$/;
                if (reg1.test(_this.val)) {
                    flag = true;
                } else if (reg1.test(_this.val) == false) {
                    $span1.style.color = 'red';
                    $span1.innerHTML = '*用户名格式错误';
                    flag = false;
                }
                if(flag){
                    _this.getGO();
                }
            },false)
            $usernameInp.addEventListener('focus',function(){
                $span1.innerHTML = '';
            },false)
            $passwordInp.onchange = function (e) {
                _this.val1 = $passwordInp.value;
                e = e || window.event;
                var reg2 = /^[a-zA-Z0-9]{1,13}$/;
                if (reg2.test(_this.val1)) {
                    $span2.innerHTML = '*密码格式正确';
                    $span2.style.color = 'green';
                } else if (reg2.test(_this.val1) == false) {
                    $span2.innerHTML = '*密码格式错误';
                }
            }
            $btn.onclick = function () {
                // 获取文本值
                var val = $usernameInp.value;
                var _val = $passwordInp.value;
                // var val = this.value;
                if (val == '') {
                    $span.innerHTML = "*请输入用户名";
                } else {
                    var params = {
                        method: "get",
                        data: {
                            username: val,
                            password: _val
                        },
                        success: function (data) {
                            location.href = "login.html";
                        }
                    }
                    // 当其他地方引用时需注意改变url 的地址或者不要将php文件放入一个文件夹，直接跟html同级，这样不用这样写，直接  xxx.php就行
                    sendAjax('http://localhost/H5-1807websites/thirdwebsites/week2site/login_register_Self/php/register.php', params);
                }
            }

        },
        getGO: function () {
            var val = $usernameInp.value;
            if (val == '') {
                $span1.innerHTML = "*请输入用户名";
            } else {
                var params = {
                    method: "get",
                    data: {
                        username: val,
                    },
                    success: function (data) {
                        if (data.msg == 101) {
                            $span1.style.color = 'red';
                            $span1.innerHTML = "*用户名已存在";
                        }
                        if (data.msg == 200) {
                            $span1.innerHTML = "*用户名可用";
                            $span1.style.color = 'green';
                        }
                    }
                }
                // 当其他地方引用时需注意改变url 的地址或者不要将php文件放入一个文件夹，直接跟html同级，这样不用这样写，直接  xxx.php就行
                sendAjax('http://localhost/H5-1807websites/thirdwebsites/week2site/login_register_Self/php/register1.php', params);
            }
        }
    }

}())