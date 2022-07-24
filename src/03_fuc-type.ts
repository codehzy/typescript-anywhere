/**
 * 1. 函数： 函数的类型签名
 */

function foo(name: string): number {
    return name.length
}


const foo1 = function (name: string): number {
    return name.length
}

// 抽离函数类型
type FucFoo = (name: string) => number

const foo2: FucFoo = (name) => {
    return name.length
}

// 甚至可以用interface来描述函数的类型结构
interface FuncFooStruct {
    (name: string): number
}

const foo3: FuncFooStruct = (name) => {
    return name.length;
}

/**
 * 2. void类型
 */
function foo4(): void { }

function bar(): void { return }

// 更推荐这样使用，表达的是，这个函数进行了返回操作，但没有返回实际的值
function bar1(): undefined {
    return;
}

/**
 * 3. 可选参数和rest参数
 *      很多时候，我们希望函数的参数可以更加灵活，故非必传
 *      可选参数必须位于必选参数之后
 */

// 在函数逻辑中注入可选参数默认值
function foo11(name: string, age?: number): number {
    const inputAge = age || 18;
    return name.length + inputAge
}

// 直接为可选参数声明默认值
function foo22(name: string, age: number = 18): number {
    const inputAge = age;
    return name.length + inputAge
}

// reset

function foo33(arg1: string, ...rest: any[]) { } // 数组
function foo44(arg1: string, ...rest: [number, boolean]) { } // 元组

foo44('nice', 18, true)

/**
 * 4， 重载： 复杂逻辑，函数可能有多组入参类型和返回值类型
 */

function func(foo: number, bar?: boolean): string | number {
    if (bar) {
        return String(foo)
    } else {
        return foo * 599
    }
}

// 重载将入参关联返回值类型
// 重载签名一，传入 bar 的值为 true 时，函数返回值为 string 类型。
// 重载签名二，不传入 bar，或传入 bar 的值为 false 时，函数返回值为 number 类型。
//  !!!! 函数的实现签名，会包含重载签名的所有可能情况。
function func1(foo: number, bar: true): string
function func1(foo: number, bar?: false): number;
function func1(foo: number, bar?: boolean): string | number {
    if (bar) {
        return String(foo)
    }
    else {
        return foo * 599
    }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number

/**
 * 异步函数、Generator 函数等类型签名
 */

async function asyncFunc(): Promise<void> { }

function* genFunc(): Iterable<void> { }

async function* asyncGenFunc(): AsyncIterable<void> { }


/**
 * 5. 类与类成员的类型签名
 */

class Foo {
    prop: string;

    constructor(inputProp: string) {
        this.prop = inputProp
    }

    print(addon: string): void {
        console.log(`${this.prop} and ${addon}`);
    }

    get propA(): string {
        return `${this.prop}+A`
    }

    // setter 方法不允许进行返回值的类型标注
    set propA(value: string) {
        this.prop = `${value}+A`
    }
}

// public private protected
// 我们通常不会为构造函数添加修饰符，而是让它保持默认的 public
class Foo1 {
    private prop: string

    constructor(inputProp: string) {
        this.prop = inputProp
    }

    protected print(addon: string): void {
        console.log(`${this.prop} and ${addon}`);
    }

    public get propA(): string {
        return `${this.prop}+A`
    }

    public set propA(value: string) {
        this.propA = `${value}+A`
    }
}

// 静态成员
// 静态成员直接被挂载在函数体上，而实例成员挂载在原型上
//      静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）。
//      而原型对象上的实例成员则会沿着原型链进行传递，也就是能够被继承。
class Foo22 {
    static staticHandler() { }

    public instanceHandler() { }
}
// 上述代码编译成es5
var Fooxx = /** @class */ (function () {
    function Foo() {
    }
    Foo.staticHandler = function () { };
    Foo.prototype.instanceHandler = function () { };
    return Foo;
}());

// 静态成员使用场景
// 收敛变量
class Utils {
    public static identifier = "linbudu";

    public static makeUHappy() {
        Utils.studyWithU();
        // ...
    }

    public static studyWithU() { }
}

Utils.makeUHappy()

/**
 * 6. 继承、实现、抽象类
 *      主要是派生类对基类成员的访问与覆盖操作
 *      派生类中可以访问到使用 public 或 protected 修饰符的基类成员。除了访问以外，基类中的方法也可以在派生类中被覆盖
 */

class Base {
    print(){}
}

class Derived extends Base {
    // 派生类中可以访问到使用 public 或 protected 修饰符的基类成员。除了访问以外，基类中的方法也可以在派生类中被覆盖
    override print(){
        super.print()
    }
}

// 抽象类
// 一个抽象类描述了一个类中应当有哪些成员（属性、方法等）
// 一个抽象方法描述了这一方法在实际实现中的结构

abstract class AbsFoo {
    // 抽象类中的成员也需要使用 abstract 关键字才能被视为抽象类成员
    abstract absProp: string;
    abstract get absGetter() : string;
    abstract absMethod(name: string): string;
}

// 我们必须完全实现这个抽象类的每一个抽象成员。需要注意的是
// 在 TypeScript 中无法声明静态的抽象成员。
class Foo33 implements AbsFoo{
    absProp: string = 'code'

    get absGetter(): string{
        return 'code'
    }

    absMethod(name: string): string {
        return name
    }
}