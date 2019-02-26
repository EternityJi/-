$(function () {
    var categoryid = location.search.slice(-1);
    var totlePage;
    var category;
    var currentPage = 1;
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data: {
            categoryid: categoryid
        },
        success: function (data) {
            console.log(data);
            $("nav .left").html(template("tpl", data));
            category = data.result[0].category;
            console.log(category);
        }
    });
    function render(pageid) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getproductlist",
            data: {
                categoryid: categoryid,
                pageid: pageid
            },
            success: function (data) {
                totlePage = Math.ceil(data.totalCount / data.pagesize);
                data.category = category;
                console.log(data);
                console.log(totlePage);
                console.log(currentPage);
                $(".content").html(template("tpl2",data));
                $(".page select").val(currentPage+"/"+totlePage);
                console.log($(".page select").val());
            }
        });
    }
    render(currentPage);
    // 点击下一页渲染下一页
    $(".next").on("click",function(){
        if(currentPage >= totlePage){
            return false;
        }
        currentPage++;
        render(currentPage);
    });
    $(".prev").on("click",function(){
        if(currentPage <= 0){
            return false;
        }
        currentPage--;
        render(currentPage);
    });
});