//递归函数是在一个函数通过名字调用自身的情况下构成
function factorial(num){
    if(num <= 1){
        return 1;
    } else {
        return num * factorial(num-1);
    }
}
//arguments.callee 是一个指向正在执行的函数的指针
function factorial(num){
    if(num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num-1);
    }
}
//在严格模式下，不能通过脚本访问 arguments.callee
factorial = (function f(num){
    if(num <= 1){
        return 1;
    } else {
        return num * f(num-1);
    }
});