// 获取参数工具对象
var tools = {
    getParamObj : function(){
      var obj = {};
      var search = decodeURI(location.search);
      var arr = search.slice(1).split("&");
      arr.forEach(function(e){
        obj[e.split("=")[0]] = e.split("=")[1];
      });
      return obj;
    },
    getParam : function(key){
      return this.getParamObj()[key];
    }
  }