//自定义验证     匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
jQuery.validator.addMethod("isPwd", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]\w{5,13}$/.test(value);
}, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

$(function () {
    $("#register").validate({
        errorPlacement: function (err, ele) {
            $("#register").find("li[class='" + ele.attr("name") + "']").append(err);
        },
        errorElement: 'p',
        rules: {
            username: {required: true, rangelength: [2, 20]},
            password: {required: true, isPwd: true},
            email: {required: true, email: true},
            v_code: {required: true}
        }
    })
});
var f = true;
$.validator.setDefaults({
    submitHandler: function () {
        if (f === false) {
            return;
        }
        f = false;
        var formData = $('#register').serialize();
        console.log(formData);
        $.ajax({
            url: '/user/do-register',
            type: 'post',
            dataType: 'json',
            data: formData,
            success: function (result, staus, xhr) {
                console.log(staus);
                if (result.code === '002') {
                    alert(result.msg);
                   getyzm();
                    return;
                }
                if (result.code === '001') {
                    confirm(result.msg);
                }
            },
            error: function(xhr, staus, error){

            },
            complete: function () {
                f = true;
            }
        })
    }
});

function getyzm(){
    $(".yzm").attr("src", "/user/get-pic?i" + new Date().getTime());
}