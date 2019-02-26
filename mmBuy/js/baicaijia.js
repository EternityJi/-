$(function () {
    var titleid = 0;
    // ul导航滑动效果
    window.resize = slideRender();
    function slideRender(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
            success: function (data) {
                console.log(data);
                $(".li_list").html(template("tpl", {
                    list: data.result
                }));
    
                
    
    
                // 动态设置ul的宽度
                var lis = $(".li_list").children();
                var ul_length = 0;
                lis.each(function () {
                    ul_length += $(this).width();
                });
                var ul = $(".li_list").css({
                    "width": ul_length
                });
                console.log(ul.width());
                // 思路:
                //1.获取滑动距离;
                //2.设置一个中间变量,这个变量的作用是用来存储上一次滑动的位置;
                //3.代码写在move,找到区间,往右不能超过50,往左不能超过(ul的宽度减去容器的宽度+50);
                //4.在滑动结束的时候,去判断当前的位置是否超出反弹区间，如果超出则ul弹回去;
                //5.反弹区间 往做右滑动大于50,往左滑动-(ul的宽度减去容器的宽度);
                // 导航ul滑动
                var ul = document.querySelector(".li_list");
                var ulWrap = document.querySelector(".ul_box");
                var start;
                var center = 0;
                var maxLeft = 50;
                var maxRight = -(ul.offsetWidth - ulWrap.offsetWidth + maxLeft);
                // 设置反弹区间
                var maxBounceLeft = 0;
                var maxBounceRight = -(ul.offsetWidth - ulWrap.offsetWidth);
                ulWrap.addEventListener("touchstart", function (e) {
                    // 记录落点位置
                    startX = e.changedTouches[0].clientX;
                });
                ulWrap.addEventListener("touchmove", function (e) {
                    // 算出手指落点与抬起之间的距离(自带正负);
                    // ul.style.transition = 'transform 1s';
                    var dx = e.changedTouches[0].clientX - startX;
                    ul.style.transition = "none";
                    var temp = center + dx;
                    if (temp >= maxLeft) {
                        temp = maxLeft;
                    } else if (temp <= maxRight) {
                        temp = maxRight;
                    }
                    // 这里需要注意一个细节点：就是每一次滑动都应该基于上一次滑动的位置在加上当前这一次的滑动距离
                    // 实现：设置一个中间变量 初始值为0
                    console.log(temp);
                    ul.style.transform = 'translateX(' + temp + 'px)';
                    console.log(1111);
                });
                ulWrap.addEventListener("touchend", function (e) {
                    var dx = e.changedTouches[0].clientX - startX;
                    // 在结束的时候将上一次滑动的最终位置赋值给centerY，以便下一次基于这个位置在加上下一次的滑动距离
                    center += dx;
                    // 反弹区间检测
                    if (center >= maxBounceLeft) {
                        center = maxBounceLeft;
                        ul.style.transition = "transform .5s";
                        ul.style.transform = "translateX(" + center + "px)";
                    } else if (center <= maxBounceRight) {
                        center = maxBounceRight;
                        ul.style.transition = "transform .5s";
                        ul.style.transform = "translateX(" + center + "px)";
                    }
                });
    
    
                // 点击不同的导航点击事件切换列表
                lis.each(function(){
                    $(this).on("click",function(e){
                        var titleid = $(this).data("id");
                        $(this).addClass("now").siblings().removeClass("now");
                        console.log(titleid);
                        proRender(titleid);
                    });
                });
            }
        });
    }
    slideRender();
    // 商品列表渲染
    function proRender(titleid){
        $.ajax({
            type:"get",
            url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
            data:{
                titleid:titleid
            },
            success:function(data){
                console.log(data);
                $(".pro_ul").html(template("tpl2",{list:data.result}));
            }
        });
    }
    proRender(titleid);

    













    // 返回顶部按钮
     $(".go_top").on("click",function(){
        $('html,body').animate({
            scrollTop:0
        },500);
    });


});