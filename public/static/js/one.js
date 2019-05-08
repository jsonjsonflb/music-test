
//轮播图
window.onload = function() {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay:true,

    });
    //弹出框
    $('.btn-lg').on('click',function() {
        var ur= $(this).parent("div").prev("img").attr('src');
        console.log (ur);
        $('.modal-body').children("img").attr("src",ur);
    });

    //WHY TOCHOOSE US  部分
    $('.one-seven-li').on('click',function () {
        var a=$(this).children('div').css('display');
        if(a==='block'){
            console.log (this);
            $(this).children('div').css('display','none');
        }else{
            $(this).children('div').css('display',"block");
        }
        $(this).siblings("li").children('div').css('display',"none");
    });

    //点击回到最顶部
    $(document).scroll(function () {
        var top=$(document).scrollTop();
        if (top>200){
            $('.cl-top').css("display","block");
        }else{
            $('.cl-top').css("display","none");
        }
    });
    $('.cl-top').on("click",function () {
        $('body,html').animate({scrollTop:0},500);
        //  document.body.scrollTop=document.documentElement.scrollTop = 0;
    });

//    点击导航切换到对应的位置
    $('.nav-one').on('click',function () {
        var one=$('.one-two').offset().top;
        $('body,html').animate({scrollTop:(one-50)},100);
    });
    $('.nav-two').on('click',function () {
        var one=$('.one-three').offset().top;
        $('body,html').animate({scrollTop:(one-50)},200);
    });
    $('.one-three').on('click',function () {
        var one=$('.one-four').offset().top;
        $('body,html').animate({scrollTop:(one-50)},300);
    });
    $('.nav-four').on('click',function () {
        var one=$('.one-five').offset().top;
        $('body,html').animate({scrollTop:(one-50)},400);
    });
    $('.nav-five').on('click',function () {
        var one=$('.one-six').offset().top;
        $('body,html').animate({scrollTop:(one-50)},500);
    });
    $('.nav-six').on('click',function () {
        var one=$('.one-seven').offset().top;
        $('body,html').animate({scrollTop:(one-50)},600);
    });
    $('.nav-senven').on('click',function () {
        var one=$('.one-eight').offset().top;
        $('body,html').animate({scrollTop:(one-50)},650);
    });
    $('.nav-eight').on('click',function () {
        var one=$('.one-night').offset().top;
        $('body,html').animate({scrollTop:(one-50)},700);
    });
};


//请求图片
function getImgList() {
  $.ajax(
    {
      url:'/picture/get-pictureByCode',
      type: 'post',
      data: 'imageCode=peple',
      dataType: 'json',
      success:function (re) {
        console.log(re);
        putImg(re.data)
      }
    }
  )
};

function putImg(list){
    if(list.length===0){
        return;
    }
    var imgin='';
    for (var i = 0; i<list.length;i++) {
        imgin += ' <div class="one-five-div1">\n' +
          '                <img src='+list[i].picLink+' alt="">' +
          '                <h3>Marcus Doe</h3>\n' +
          '                <span>FOUNDER</span>\n' +
          '                <p>Lorem ipsum dolor amet, tempor ut labore magna tempor dolore</p>' +
          '                <div class="one-five-i">' +
          '                    <a href="" class=" iconfont-first icon-firstfacebook"></a>' +
          '                    <a href="" class=" iconfont-first icon-firsttwitter"></a>' +
          '                    <a href="" class=" iconfont-first icon-firstyouxiang"></a>' +
          '                </div>' +
          '            </div>';
    }
    console.log(imgin);

    $('.one-five-div').html(imgin);



}

getImgList()

