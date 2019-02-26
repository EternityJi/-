$(function(){
    var productid = tools.getParam("productid");
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getmoneyctrlproduct",
        data:{
            productid:productid
        },
        success:function(data){
            console.log(data);
            $(".top_render").html(template("tpl",data));
        }
    });
});