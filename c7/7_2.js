//闭包
function createComparisonFunction(propertyName){
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2 ){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}
//
function compare(value1, value2){
    if (value1 < value2 ){
        return -1;
    } else if (value1 > value2){
        return 1;
    } else {
        return 0;
    }
}
var result = compare(5,10);
var compareNames = createComparisonFunction("name");
var result = compareNames({name : "Nicholas"},{name : "Greg"});
compareNames = null;
//闭包与变量
//副作用：闭包只能取得包含函数中任何变量的最后一个值
function createFunctions(){
    var result = new Array();
    for(var i=0; i<10; i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}//返回的结果 i 都是10
function createFunctions(){
    var result = new Array();
    for (var i=0; i<10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
//关于 this 对象
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()());//The Window
//把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
alert(object.getNameFunc()());//My Object
var name = "The Window";
var object = {
    name : "My Object",
    getName:function(){return this.name;}
};
object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)();//"The Window"