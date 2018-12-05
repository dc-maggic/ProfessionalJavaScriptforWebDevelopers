//旧的模式创建新对象
var person =new Object();
person.name="Nicholas";
person.age=29;
person.job="Software Engineer";
person.sayName=function (){
    alert(this.name);
}
//对象字面量创建对象
var person={
    name:"Nicholas",
    age:29,
    job:"Software Engineer",
    sayName:function(){
        alert(this.name);
    }
}
//加入数据属性
//使用 ECMAScript5 的 Object.defineProperty()方法修改属性默认的特性；
//严格模式下，赋值操作将会导致抛出错误；
//非严格模式下，赋值操作将被忽略；
var person={};
Object.defineProperty(person,"name",{
       writable:false,
       value:"Nicholas"
   });
alert(person.name);
person.name="Grey";
alert(person.name);

var person={};
Object.defineProperty(person,"name",{
    configurable:false,
    value:"Nicholas"
});
alert(person.name);
delete person.name;
alert(person.name);

//一旦把属性定义为不可配置的，就不能再把它变回可配置了；
var person={};
Object.defineProperty(person,"name",{
    configurable:false,
    value:"Nicholas"
});
Object.defineProperty(person,"name",{
    configurable:true,
    value:"Nicholas"
});

//访问器属性不包含数据值，包含getter、setter函数
//get 在读取属性时调用的函数
//set 在写入属性时调用的函数
var book={
    _year:2004,
    edition:1
};
Object.defineProperty(book,"year",{
    get:function(){
        return this._year;
    },
    set:function(newValue){
        if(newValue>2004){
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});
book.year=2005;
alert(book.edition);

//在不支持ECMAScript5 的这个办法的浏览器的解决方法
//使用2个非标准的方法: __defineGetter__() __defineSetter__()
var book={
    _year:2004,
    edition:1
};
book.__defineGetter__("year",function(){
    return this._year;
});
book.__defineSetter__("year",function(newValue){
    if(newValue > 2004){
        this._year = newValue;
        this.edition += newValue - 2004;
    }
});
book.year=2005;
alert(book.edition);

//新增 ECMAScript5 的 Object.defineProperties()方法
//这个方法可以一次定义多个属性；
//这个方法接收2个对象参数：
//第一个对象参数是要添加和修改其属性的对象
//第二个对象的属性与第一个对象中的属性一一对应
var book={};
Object.defineProperties(book,{
    _year:{
        writable:true,
        value:2004
    },
    edition:{
        writable:true,
        value:2
    },
    year:{
        get:function(){
            return this._year;
        },
        set:function(newValue){
            if(newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});

//Object.getOwnPropertyDescriptor()方法可以给取得给定属性的描述符
//这个方法接收2个参数
var book={};
Object.defineProperties(book,{
    _year:{
        value:2004
    },
    edition:{
        value:1
    },
    year:{
        get:function(){
            return this._year;
        },
        set:function(newValue){
            if(newValue > 2004){
                this.year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
alert(descriptor.value);
alert(descriptor.configurable);
alert(typeof descriptor.get);
var descriptor = Object.getOwnPropertyDescriptor(book,"year");
alert(descriptor.value);
alert(descriptor.enumerable);
alert(typeof descriptor.get);