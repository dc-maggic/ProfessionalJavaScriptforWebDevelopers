//模仿块级作用域
function outputNumbers(count){
    for(var i=0; i <count; i++){
        alert(i);
    }
    alert(i);
}
//使用私有作用域
function outputNumbers(count){
    (function(){
    for(var i=0; i <count; i++){
        alert(i);
    }})();
    alert(i);
}
(function(){
    var now = new Data();
    if(now.getMoth() == 0 && now.getData() == 1){
        alert("Happy new year!");
    }
})