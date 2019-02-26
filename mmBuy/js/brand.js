$(function(){
    var brandtitleid = tools.getParam("brandtitleid");
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getbrand",
        data:{
            brandtitleid:brandtitleid
        },
        success:function(data){
            console.log(data);
            $(".brand_list_wrap").html(template("tpl",{list:data.result}));
        }
    });

    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getbrandproductlist",
        data:{
            brandtitleid:brandtitleid,
            pagesize:5
        },
        success:function(data){
            console.log(data);
            $(".product_list_wrap").html(template("tpl2",{list:data.result}));
        }
    });

    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getproductcom",
        data:{
            productid:1
        },
        success:function(data){
            console.log(data);
            // $(".user_com_wrap").html(template("tpl3",{list:data.result}));
        }
    });
});