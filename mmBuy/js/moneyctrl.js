$(function () {
    var currentPage = Number(tools.getParam("pageid")) || 1;
    console.log(currentPage);
    var total;
    function pageRender(currentPage) {
        console.log(currentPage);
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getmoneyctrl",
            data:{
                pageid:currentPage
            },
            success: function (data) {
                var comcountArr = [];
                data.result.forEach(function(e,i){
                    comcountArr.push(e.productComCount.slice(1).split("人")[0]);   
                });
                comcountArr.forEach(function(e,i){
                    data.result[i].comcount = e;
                });
                var totalPage = [];
                total = Math.ceil(data.totalCount / data.pagesize);
                for (var i = 1; i <= total; i++) {
                    totalPage.push(i + "/" + total);
                }
                data.totalPage = totalPage;
                data.currentPage = currentPage;
                data.prev = currentPage - 1;
                data.next = currentPage + 1;
                console.log(data);
                $(".recommen_producet").html(template("tpl", data));
            }
        });
    }
    pageRender(currentPage);
    console.log($(".select"));
    $(".recommen_producet").on("change",".select",function(){
        location.href="moneyctrl.html?pageid="+(Number($(this).val())+1);
    });

    // 分页渲染
    // 点击下一页渲染下一页
    $(".recommen_producet").on("click",".next",function () {
        console.log(currentPage);
        if (currentPage >= total) {
            return false;
        }
        currentPage++;
        console.log(currentPage);
        pageRender(currentPage);
    });
    $(".recommen_producet").on("click",".prev",function () {
        if (currentPage <= 0) {
            return false;
        }
        currentPage--;
        pageRender(currentPage);
    });



});