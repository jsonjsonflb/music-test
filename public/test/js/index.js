//登录表单验证 提交
var flag = true;  //定义标识，解决多次请求接口的问题
$.validator.setDefaults({
    submitHandler: function ()   {
        if (flag === false) {
            return;
        }
        flag = false;
        //获取到 #commentForm 表单的参数，并且序列化数据
        var formData = $("#commentForm").serialize();
        console.log(formData);
        //请求接口
        $.ajax({
            url: '/user/do-login',
            type: 'post',
            dataType: 'json',
            data: formData,
            success: function (result, staus, xhr) {
                if (result.code === '002') {
                    showDiv({
                        conn: result.msg, width: '300px'
                    });
                }
                if (result.code === '001') {
                    showDiv({
                        conn: result.msg, width: '300px'
                    });
                    window.location.href='/home';
                }
            },
            error: function (xhr, staus, error) {
                console.log(error);
                if (staus === '403') {
                }
            },
            complete: function (xhr, status) {
                flag = true;
            }
        })
    }
});
//自定义验证     匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
jQuery.validator.addMethod("isPwd", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]\w{6,12}$/.test(value);
}, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

$().ready(function () {
    //验证表单
    $("#commentForm").validate({
        //改变错误消息的提示位置
        errorPlacement: function (error, element) {
            $("#commentForm ").find("li[class='" + element.attr("id") + "']").append(error);
        },
        //错误消息的元素的标签类型
        errorElement: "p",
        //定义规则
        rules: {
            username: {required: true,rangelength:[2,20]},
            password: {required: true}
        },
        //错误消息的提示内容
        messages: {
            username: {required: "请输入用户名"},
            password: {required: "请输入密码"}
        }
    });
});