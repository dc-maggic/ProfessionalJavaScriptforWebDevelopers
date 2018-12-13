//私有bianl
//JavaScript 没有私有成员的概念，所有对象属性都是公有的
function add(num1,num2){
    var sum = num1 + num2;
    return sum;
}
//特权方法
function MyObject(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权方法
    this.publicMethod = function(){
        privateVariable++;
        return privateFunction;
    };
}
//利用私有和特权成员，可以隐藏那些不应该被直接修改的数据
function Person(name){
    this.getName = function(){
        return name;
    };
    this.setName = function(value){
        name = value;
    };
}
var person = new Person("Nicholas");
alert(person.getName());
person.setName("Greg");
alert(person.getName());

//静态私有变量
(function(){
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    MyObject = function(){};
    MyObject.prototype.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    }
})
(function(){
    var name = "";
    Person = function(value){
        name = value;
    };
    Person.prototype.getName = function(){
        return name;
    };
    Person.prototype.setName = function(value){
        name = value;
    };
})();
var person1 = new Person("Nicholas");
alert(person1.getName());
person1.setName("Greg");
alert(person1.getName());
var person2 = new Person("Michael");
alert(person1.getName());
alert(person2.getName());
//加入我想共享与不共享
(function(){
    var name = "";
    Person = function(value,age){
        name = value;
        age = age;
        this.getAge =function(){
            return age;
        };
        this.setAge = function(v){
            age = v;
        };
    };
    Person.prototype.getName = function(){
        return name;
    };
    Person.prototype.setName = function(value){
        name = value;
    };
    
})();
var person1 = new Person("Nicholas",29);
alert(person1.getName());
alert(person1.getAge());
person1.setName("Greg");
alert(person1.getName());
person1.setAge(30)
alert(person1.getAge());
var person2 = new Person("Michael",10);
alert(person1.getName());
alert(person2.getName());
alert(person1.getAge());
alert(person2.getAge());

//模块模式
//单例(singleton) 只有一个实例
//JavaScript 是以对象字面量的方式来创建单例对象的。
var singleton = {
    name : value,
    method : function(){}
};
//模块模式通过为单例添加私有变量的特权方法能够使其得到增强
var singleton= function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权/公有方法和属性
    return{
        publicProperty : true,
        publicMethod : function(){
            privateVariable++;
            return privateFunction();
        }
    };
}();
//以上这种模式在需要对单例进行某些初始化，
//同时又需要维护其私有变量时非常有用
var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new BaseComponents());
    //公共
    return{
        getComponents : function(){
            return components.length;
        },
        regsiterComponent : function(component){
            if (typeof component == "object"){
                components.push(component);
            }
        }
    };
}();

//增强模块的模式
var singleton = function(){
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    var object = new CustomType();
    object.publicProperty = true;
    object.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };
    return object;
}
var application = function(){
    var components = new Array();
    components.push(new BaseComponent());
    var app = new BaseComponent();
    app.getComponentCount = function(){
        return components.length;
    };
    app.registerComponent = function(component){
        if(typeof component == "object"){
            components.push(component);
        }
    };
    return app;
}();