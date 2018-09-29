var getLogin = (function () {
    var $form = document.getElementById('form');
    var $usernameInp = $form.username;
    var $passwordInp = $form.password;
    var $btn = $form.btn;
    var $span1 = $form.querySelector('.span1');
    var $span2 = $form.querySelector('.span2');
    console.log($usernameInp.value);
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var _this = this;
            $usernameInp.onchange = function(e){
                _this.val = $usernameInp.value;
                e = e || window.event;
                console.log(_this.val);
                var reg1 = /^\w{1,15}/;
                if(reg1.test(_this.val)){
                    $span1.innerHTML = '*用户名格式正确';
                    $span1.style.color = 'green';
                }else if(reg1.test(_this.val) == false){
                    $span1.innerHTML = '*用户名格式错误';
                }
            }
            $passwordInp.onchange = function(e){
                _this.val1 = $passwordInp.value;
                e = e || window.event;
                var reg2 = /^[a-zA-Z0-9]{1,13}/;
                if(reg2.test(_this.val1)){
                    $span2.innerHTML = '*密码格式正确';
                    $span2.style.color = 'green';
                }else if(reg2.test(_this.val1) == false){
                    $span2.innerHTML = '*密码格式错误';
                }
            }
            $btn.onclick = function (e) {
                e = e || window.event;
                var val = $usernameInp.value;
                var _val = $passwordInp.value;
                var params = {
                    method: "post",
                    data: {
                        username: val,
                        password: _val
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.msg == 200) {
                            location.href = 'manager.html';
                        }
                        if (data.msg == 101) {
                            alert('密码错误');
                        }
                        if (data.msg == 300) {
                            alert('用户不存在,请注册！')
                            location.href = 'register.html';
                        }

                    }
                }
                // 当其他地方引用时需注意改变url 的地址或者不要将php文件放入一个文件夹，直接跟html同级，这样不用这样写，直接  xxx.php就行
                sendAjax('http://localhost/H5-1807websites/thirdwebsites/week2site/login_register_Self/php/login.php', params);
            }

        }
    }
}())