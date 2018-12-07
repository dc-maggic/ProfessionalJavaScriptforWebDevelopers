//原型链
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property
};
function SubType(){
    this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};
var instance = new SubType();
alert(instance.getSubValue());
//确认原型和实例的关系
alert(instance instanceof Object); //true
alert(instance instanceof SuperType); //true
alert(instance instanceof SubType); //true
//使用 isPrototypeOf() 方法
alert(Object.prototype.isPrototypeOf(instance));  //true
alert(SuperType.prototype.isPrototypeOf(instance));  //true
alert(SubType.prototype.isPrototypeOf(instance));  //true
//给原型添加方法的代码一定要放在替换原型的语句之后
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue= function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
SubType.property = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};
SubType.prototype.getSuperValue = function(){
    return false;
};
var instance = new SubType();
alert(instance.getSuperValue()); //false
//通过原型链实现继承时，不能使用对象字面量创建原型方法
//因为这样会重写原型链
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue= function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype= {
    getSubValue:function(){
        return this.subproperty;
    },
    someOtherMethod:function(){
        return false;
    }
};
var instance = new SubType();
alert(instance.getSuperValue());//error
//原型链的问题
//通过原型链实现继承时，原型实际上会变成另一个类型的实例。
//于是，原先的实例属性也就顺理成章地变成了现在的原型属性了
function SuperType(){
    this.colors = ["red", "blue", "green"];
}
function SubType(){}
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);
var instance2 = new SubType();
alert(instance2.colors);

//借用构造函数（constructor stealing）
//基本思想是在子类型构造函数的内部调用超类型构造函数
function SuperType(){
    this.colors = ["red", "blue", "green"];
}
function SubType(){
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors);
var instance2 = new SubType();
alert(instance2.colors);
//传递参数
function SuperType(name){
    this.name = name;
}
function SubType(){
    SuperType.call(this,"Nicholas");
    this.age = 29;
}
var instance = new SubType();
alert(instance.name);
alert(instance.age);

//组合继承（combination inheritance）
//指的是将原型链和借用构造函数的技术组合到一起，从而发挥二者之长的一种继承模式
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
var instance1 = new SubType("Nicholas",29);
instance1.colors.push("black");
alert(instance1.colors);
instance1.sayName();
instance1.sayAge();
var instance2 = new SubType("Greg",27);
alert(instance2.colors);
instance2.sayName();
instance2.sayAge();

//原型式继承
//借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
var person = {
    name : "Nicholas",
    friends : ["Shelby", "Court", "Van"]
};
var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //["Shelby", "Court", "Van", "Linda", "Barbie"]
//新增 Object.creat()
//只传入一个参数的情况下， Object.creat() 与 object() 方法的行为相同
var person = {
    name : "Nicholas",
    friends : ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends);
//第二个参数与 Object.defineProperties() 方法的第二个参数格式相同
var person = {
    name : "Nicholas",
    friends : ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person,{
    name:{
        value:"Greg"
    }
});
alert(anotherPerson.name)

//寄生式继承
function createAnother(original){
    var clone = object(original);
    clone.sayHi = function(){
        alert("hi!");
    };
    return clone;
}
var person = {
    name : "Nicholas",
    friends : ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi();

//寄生组合式继承
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this,name);
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
//寄生组合式继承的基本模式
function inheritPrototype(subType,superType){
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert.prototype(this.name);
};
function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}
inheritPrototype(SubType,SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
}