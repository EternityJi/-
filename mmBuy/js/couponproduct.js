$(function(){
    var couponid = tools.getParam("couponid");
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getcouponproduct",
        data:{
            couponid:couponid
        },
        success:function(data){
            var oldArr = data.result
            oldArr.forEach(function(e,i){
                var temp = e.couponProductImg.split(' ')[1];
                temp = temp.split("src=")[1].slice(1).slice(0,-1);
                data.result[i].imgSrc = temp;
            });
            $(".list_item").html(template("tpl",{list:data.result}));
        }
    });
});