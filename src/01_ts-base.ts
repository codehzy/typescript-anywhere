import { AxiosRequestConfig } from "axios";

/**
 * 1. 原始类型
 */
const name1: string = 'coder'
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name1, age, male };
const bigintVar1: bigint = 9007199254740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');

/**
 * 2. null 和 undefined
 */

const tmp1: null = null
const tmp2: undefined = undefined

// 关闭 strictNullChecks 检查才有效
// const tmp3: string = null
// const tmp4: string = undefined

/**
 * 3. void
 */

// undefined 能够被赋值给 void 类型的变量（需要在关闭 strictNullChecks 配置的情况下才能成立）
function func1() { }
function func2() {
    return;
}
function func3() {
    return undefined;
}

/**
 * 3. 数组 和 元组
 */
const arr1: string[] = []
const arr2: Array<string> = []

// 元组 - Tuple
const arr3: string[] = ['z', 'x', 'c']
console.log(arr3[599]); // undefined

const arr4: [string, string, string] = ['x', 'a', 'w']
// error: 长度为 "3" 的元组类型 "[string, string, string]" 在索引 "599" 处没有元素。
// console.log(arr4[599]); 

const arr6: [string, number?, boolean?] = ['nice'];
// 3 | 1 | 2
type TupleLength = typeof arr6.length

// 数组和元组的对比
// 除了上述通过索引来访问会导致越界，数组的解构也存在隐式访问越界
const arr55: string[] = []
const [ele1, ele2, ...rest] = arr55

// 对于数组，此时仍然无法检查出是否存在隐式访问，因为类型层面并不知道它到底有多少个元素。
// 但对于元组，隐式的越界访问也能够被揪出来给一个警告
// 元组能进一步帮助我们提升数组结构的严谨性
const arr5: [string, number, boolean] = ['nice', 599, true];
// error: 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素
// const [name5, age5, male5, other5] = arr5;

/**
 * 4. 对象类型
 */
interface IDescription {
    readonly name: string;
    age: number;
    male: boolean;
    func?: Function
}

const obj1: IDescription = {
    name: 'code',
    age: 599,
    male: true,
    // func 非必须实现
}

// 使用 ?. 来标记某个属性为可选属性

// error: 无法分配到 "name" ，因为它是只读属性
// obj1.name = 'nice'

/**
 * 5. object Object {} 
 *  Object: 
 *          在js中，原型链的顶端是 Object 以及 Function，这也就意味着所有的原始类型与对象类型最终都指向 Object
 *          在ts中，表现为包含所有的类型
 *  object:
 *          object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型
 *  {}:
 *          {} 你可以认为是一个 内部无熟悉感定义的空对象。它意味着任何非null/undefine的值
 */

// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
// const tmp1: Object = undefined;
// const tmp2: Object = null;
// const tmp3: Object = void 0;

const tmp4: Object = 'coder';
const tmp5: Object = 599;
const tmp6: Object = { name: 'coder' };
const tmp7: Object = () => { };
const tmp8: Object = [];

// ** 在任何情况下，你都不应该使用这些装箱类型。 Boolean、Number、String、Symbol


// object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型这些：
// const tmp20: object = 'coder';  // error: X 不成立，值为原始类型
// const tmp21: object = 599; // error: X 不成立，值为原始类型

const tmp28: {} = 'code';
const tmp29: {} = 599;
const tmp30: {} = { name: 'code' };
const tmp31: {} = () => { };
const tmp32: {} = [];

// 虽然能够将其作为变量的类型，但你实际上无法对这个变量进行任何赋值操作
const tmp33: {} = { name: "coder" }
// tmp33.name = '123'; // error： 类型“{}”上不存在属性“name”。


// 总结
// 1. 在任何时候都不要，不要，不要使用 Object 以及类似的装箱类型
// 2. 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。
//    但我更推荐进一步区分，也就是使用 Record<string, unknown> 或 Record<string, any> 表示对象，unknown[] 或 any[] 表示数组，(...args: any[]) => any表示函数这样。
// 3. 我们同样要避免使用{}。{}意味着任何非 null / undefined 的值，从这个层面上看，使用它和使用 any 一样恶劣。

// 补充： Record用法
// Record<K,T>构造具有给定类型T的一组属性K的类型。在将一个类型的属性映射到另一个类型的属性时，Record非常方便。
interface EmployeeType {
    id: number
    fullName: string
    role: string
}

const employees: Record<number, EmployeeType> = {
    0: { id: 1, fullName: "John Doe", role: "Designer" },
    1: { id: 2, fullName: "Ibrahima Fall", role: "Developer" },
    2: { id: 3, fullName: "Sara Duckson", role: "Developer" },
}

// example Record
type petsGroup = 'dog' | 'cat' | 'fish'
interface IPetInfo {
    name: string,
    age: number
}

type IPets = Record<petsGroup,IPetInfo>

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    }
}

// example2
type petsGroup1 = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets1 = Record<petsGroup1 | 'otherAnimal',IPetInfo>

const animalsInfo1:IPets1 = {
    dog:{
        name:'dogName',
        age:2
    },
   cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    },
    otherAnimal:{
        name:'otherAnamialName',
        age:10
    }
}