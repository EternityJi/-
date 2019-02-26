$(function () {
    var shopid;
    var areaid;
    // 给导航注册点击事件,点击后显示导航数据
    $(".jd").one("click", function () {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsshop",
            success: function (data) {
                console.log(data);
                $ul = $(".second_ul");
                $ul.html(template("tpl", {
                    list: data.result
                }));
                $ul.css({
                    "display": "none"
                });
                $ul.slideDown();
                $(".jd").on("click", function () {
                    $ul.next().stop(true).hide();
                    $ul.stop().slideToggle();
                });
                // 给ul下面的所有li注册点击事件
                $lis = $(".second_ul li");
                $lis.each(function () {
                    $(this).on("click", function () {
                        // 添加now类
                        $(this).addClass("now").siblings().removeClass("now");

                        //获取参数shopid
                        shopid = $(this).data("shopid");

                        // 修改nav导航的值
                        var shopName = $(this).data("name");
                        $(".nav_name_jd").text(shopName);

                        // 隐藏掉ul
                        $(this).parent().hide();

                        // 重新渲染
                        renderMain(shopid,areaid);
                    });
                });
            }
        });
    });
    $(".hb").one("click", function () {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsshoparea",
            success: function (data) {
                $ulh = $(".second_ul_hb");
                $ulh.html(template("tpl2", {
                    list: data.result
                }));
                $ulh.css({
                    "display": "none"
                });
                $ulh.slideDown();
                $(".hb").on("click", function () {
                    $ulh.prev().stop(true).hide();
                    $ulh.stop().slideToggle();
                });
                $lis = $(".second_ul_hb li");
                $lis.each(function () {
                    $(this).on("click", function () {
                        // 添加now类
                        $(this).addClass("now").siblings().removeClass("now");

                        // 获取参数areaid
                        areaid = $(this).data("areaid");


                        // 修改nav导航的值
                        var areaName = $(this).data("name");
                        areaName = areaName.split("（")[0];
                        $(".nav_name_hb").text(areaName);

                        //隐藏ul
                        $(this).parent().hide();

                        // 重新渲染
                        renderMain(shopid,areaid);
                    });
                });
            }
        });
    });

    // 渲染列表
    renderMain(shopid,areaid);
    
    
    function renderMain(shopid, areaid) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsproduct",
            data: {
                shopid: shopid || 0,
                areaid: areaid || 0
            },
            success: function (data) {
                console.log(data);
                $(".main_list").html(template("tpl3", {
                    list: data.result
                }));
            }
        });
    }
});