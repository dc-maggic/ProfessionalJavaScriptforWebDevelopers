//函数声明
function functionName(arg0,arg1,arg2){
    //函数体
}
alert(functionName.name);
//函数声明提升
//就是在指向代码之前会先读取函数声明
sayHi();
function sayHi(){
    alert("Hi!");
}
//使用函数表达式
var functionName = function(arg0, arg1, arg2){
    //函数体
};
//
var sayHi;
if(condition){
    sayHi = function(){
        alert("Hi!");
    };
} else{
    sayHi = function(){
        alert("Yo!");
    };
}
//能够创建函数再赋值给变量，也就能够把函数作为其他函数的值返回
function createComparisonFunction(propertyName){
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if(value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}