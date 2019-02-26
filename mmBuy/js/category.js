$(function () {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        success: function (data) {
            $(".row").html(template("tpl", {
                list: data.result
            }));
            $(".getCategory").on("click", function () {
                var id = $(this).data("id");
                if($(this).next().find("li").length == 0){
                    renderCategory(id);
                } else {
                    $(this).next().slideToggle();
                }
            });   
        }
    });
    // 点击按钮切换显示与隐藏
  

    function renderCategory(id) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getcategory",
            data: {
                titleid: id
            },
            success: function (data) {
                $ul = $("a[index=" + id + "]").next();
                $ul.html(template("tpl2", {
                    list: data.result
                }));
                $ul.css({
                    "display":"none"
                });
                $ul.slideDown();
            }
        });
    }
    // 回到顶部按钮
    $(".to_top").on("click",function(){
        $('html,body').animate({
            scrollTop:0
        },500);
    });
});