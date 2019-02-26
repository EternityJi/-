$(function(){
    // 发送ajax请求获取menu信息渲染到页面
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getindexmenu",
        success:function(data){
            console.log(data);
            $(".li_list").html(template("tpl",{list : data.result}));
            $(".more").nextAll().hide();
        }
    });
    // 点击更多按钮显示隐藏最后一行li
    $(".li_list").on("click",".more",function(){
        $(this).nextAll().slideToggle();
    });
    // 渲染商品列表页面
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getmoneyctrl",
        success:function(data){
            var comcountArr = [];
            var comcountObj = {};
            data.result.forEach(function(e,i){
                comcountArr.push(e.productComCount.slice(1).split("人")[0]);   
            });
            comcountArr.forEach(function(e,i){
                data.result[i].comcount = e;
            });
            console.log(data.result);
            $(".product_list").html(template("tpl2",{list:data.result}));
        }
    });

    // 回到顶部按钮
    $(".to_top").on("click",function(){
        $('html,body').animate({
            scrollTop:0
        },500);
    });
});