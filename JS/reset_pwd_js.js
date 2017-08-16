$("#reset_pw_btn").click(function () {
    let user_email=location.href.split("?")[1].split("=")[1];
    let user_pw = $('#user_pw').val();
    let user_cfm_pw = $('#user_cfm_pw').val();
    if(user_pw.length < 7){
        layer.alert('Your password is too short, please change a safety one.',{
            icon: 0,
            title: 'WARNING'
        },function (index) {
            $('#user_pw').val('');
            $('#user_cfm_pw').val('');
            layer.close(index);
        });
    }
    else if(user_pw !== user_cfm_pw){
        layer.alert('The password did not match the re-typed password.',{
            icon: 0,
            title: 'WARNING'
        },function (index) {
            $('#user_pw').val('');
            $('#user_cfm_pw').val('');
            layer.close(index);
        });
    }
    else {
        $.ajax({
            type: 'PUT',
            url: '/reset_pwd',
            data: {
                user_email: user_email,
                user_password: user_cfm_pw
            },
            success: function (responseText, textStatus) {
                if (textStatus) {
                    layer.alert('密码重置成功！', {
                        title: '恭喜你',
                        icon: 1
                    },function () {
                        $.cookie("user_password", "", {expires: -1});
                        window.location.href="/login";
                    });
                }
            }
        });
    }
});