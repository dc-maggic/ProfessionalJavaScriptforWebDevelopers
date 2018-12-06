//工厂模式
//没有解决对象识别的问题（即怎样知道一个对象的类型）
function createPerson(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var person1 = createPerson("Nicholas",29,"Sofeware Engineer");
var person2 = createPerson("Greg",27,"Doctor");

//构造函数模式
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var person1 = new Person("Nicholas",29,"Sofeware Engineer");
var person2 = new Person("Greg",27,"Doctor");
//对象都有 constructor(构造函数)属性
alert(person1.constructor == Person);
alert(person2.constructor == Person);
//还有检测对象类型 instanceof
alert(person1 instanceof Object);
alert(person1 instanceof Person);
alert(person2 instanceof Object);
alert(person2 instanceof Person);

//将构造函数当作函数
var person = new Person("Nicholas",29,"Sofeware Engineer");
person.sayName();
Person("Greg",27,"DOctor");
window.sayName();
var o = new Object();
Person.call(o,"Kristen",25,"Nurse");
o.sayName();

//构造函数的主要问题就是每个办法都要在每个实例上重新创建一遍；
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("alert(this.name)");//与声明函数在逻辑上是等价的
}
var person1 = new Person("Nicholas",29,"Sofeware Engineer");
var person2 = new Person("Greg",27,"Doctor");
//每个 Person 实例都包含一个不同的 Function 实例
alert(person1.sayName == person2.sayName); //false

//把函数定义转移到构造函数外部来解决这个问题
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name);
}
var person1 = new Person("Nicholas",29,"Sofeware Engineer");
var person2 = new Person("Greg",27,"Doctor");
alert(person1.sayName == person2.sayName);//true

//原型模式
function Person(){}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "SoftWare Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
person1.sayName();
var person2 = new Person();
person2.sayName();
alert(person1.sayName == person2.sayName);
//新增方法 isPrototypeOf() 返回的对象实际就是这个对象的原型
alert(Person.prototype.isPrototypeOf(person1));
alert(Person.prototype.isPrototypeOf(person1));
//Object.getPrototypeOf 这个方法返回[[Prototype]]
alert(Object.getPrototypeOf(person1) == Person.prototype);
alert(Object.getPrototypeOf(person1).name);

//可以通过对象实例访问保存再原型中的值，但却不能通过对象实例重写原型中的值
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Grey";
alert(person1.name);//“Greg" 来自实例
alert(person2.name);//“Nicholas” 来自原型

//delete 操作符
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Grey";
alert(person1.name);
alert(person2.name);
delete person1.name;
alert(person1.name);

//hasOwnProperty()
//方法可以检测一个属性是存在于对象实例中，还是存在于原型中；
//只有给定属性存在于对象实例中，才会返回 true；
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Grey";
alert(person1.name);
alert(person1.hasOwnProperty("name"));
alert(person2.name);
alert(person2.hasOwnProperty("name"));
delete person1.name;
alert(person1.name);
alert(person1.hasOwnProperty("name"));

//
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name"));
alert("name" in person1);
person1.name ="Greg";
alert(person1.hasOwnProperty("name"));
alert("name" in person1);
alert(person2.name);
alert(person2.hasOwnProperty("name"));
alert("name" in person2);
delete person1.name;
alert(person1.name);
alert(person1.hasOwnProperty("name"));
alert("name" in person1);
function hasPrototypeProperty(object, name){
    return !object.hasOwnProperty(name) && (name in object);
}

function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
function hasPrototypeProperty(object, name){
    return !object.hasOwnProperty(name) && (name in object);
}
var person = new Person();
alert(hasPrototypeProperty(person, "name"));
person.name = "Greg";
alert(hasPrototypeProperty(person, "name"));

//Object.keys()方法
//取得对象上所有可枚举的实例属性
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var keys = Object.keys(Person.prototype);
alert(keys);//name,age,job,sayName
var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
alert(p1keys);//name,age

//Object.getOwnPropertyNames()方法
//可以得到所有实例属性，无论是否可枚举
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys);//constructor,name,age,job,sayName
var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.getOwnPropertyNames(p1);
alert(p1keys);//name,age

//更简单的原型语法
function Person(){}
Person.prototype = {
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function() {
        alert(this.name);
    }
};
//constructor 属性不再指向 Person
//实际上重写了默认的 prototype 对象
//因此 constructor 属性也就变成了新对象的 constructor 属性（指向 Object 构造函数）
var friend = new Person();
alert(friend instanceof Object);//true
alert(friend instanceof Person);//true
alert(friend.constructor == Person);//false
alert(friend.constructor == Object);//true

//如果 constructor 的值真的很重要
//可以将它设置回适当的值
//但是这样会导致它的 [[enumberable]] 特性被设置为 true
function Person(){}
Person.prototype = {
    constructor : Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function() {
        alert(this.name);
    }
};

//Object.defineProperty()
function Person(){}
Person.prototype = {
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function() {
        alert(this.name);
    }
};
Object.defineProperty(Person.prototype, "constructor",{
    enumerable : false,
    value : Person
});
var friend = new Person();
alert(friend instanceof Object);//true
alert(friend instanceof Person);//true
alert(friend.constructor == Person);//true
alert(friend.constructor == Object);//false

//原型的动态性
var friend = new Person();
Person.prototype.sayHi = function(){
    alert("Hi!");
};
friend.sayHi();

//实例的指针仅指向原型，而不指向构造函数
function Person(){

}
var friend = new Person();
Person.prototype = {
    constructor : Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    sayName : function() {
        alert(this.name);
    }
};
friend.sayName();//erro 它指的是原本的原型

//原生对象的原型
String.prototype.startsWith = function(text){
    return this.indexOf(text) == 0;
};
var msg = "Hello world";
alert(msg.startsWith("Hello"));

//原型对象的问题
//它省略了为构造函数传递初始化参数这一环节，结果所有默认情况下都将取得相同的属性值
//最大问题是由其共享的本性所导致的
function Person(){

}
Person.prototype = {
    constructor : Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function() {
        alert(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends);  //Shelby,Court,Van
alert(person2.friends);  //Shelby,Court,Van
alert(person1.friends === person2.friends);  //true

//组合使用构造函数魔术和原型模式
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby","Court"];
}
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}
var person1 = new Person("Nicholas",29,"Software Engineer");
var person2 = new Person("Greg",27,"Doctor");
person1.friends.push("Van");
alert(person1.friends);  //Shelby,Court,Van
alert(person2.friends);  //Court,Van
alert(person1.friends == person2.friends);  //false
alert(person1.sayName === person2.sayName);  //true

//动态原型模式
function Person(name,age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    if( typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            alert(this.name);
        };
    }
}

var friend = new Person("Nicholas",29,"Software Engineer");
friend.sayName();

//寄生构造函数模式
//基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码
//然后再返回新创建的对象
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var friend = new Person("Nicholas",29,"Software Engineer");
friend.sayName();

function SpecialArray(){
    var values = new Array();
    values.push.apply(values,arguments);
    values.toPipedString = function(){
        return this.join("|");
    };
    return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString());

//稳妥构造函数模式
//指的是没有公共属性，而且也不引用 this 的对象
function Person(name,age,job){
    var o = new Object();
    o.sayName = function(){
        alert(name);
    };
    return o;
}
var friend = Person("Nicholas",29,"Software Engineer");
friend.sayName();