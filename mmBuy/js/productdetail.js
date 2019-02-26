$(function () {
    var productid = tools.getParam("productId");
    var productid = tools.getParam("productId");
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproduct",
        data: {
            productid: productid
        },
        success: function (data) {
            var brandName = tools.getParam("brandName");
            var category = tools.getParam("category");
            data.result[0].brandName = brandName;
            data.result[0].category = category;
            $("nav .left").html(template("tpl", data));
        }
    });
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getproduct",
        data:{
            productid:productid,
        },
        success:function(data){
            console.log(data);
            $(".show_product").html(template("tpl2",{list:data.result}));
        }
    });
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getproductcom",
        data:{
            productid:productid,
        },
        success:function(data){
            console.log(data);
            $(".user_com").html(template("tpl3",{list:data.result}));
        }
    })





});