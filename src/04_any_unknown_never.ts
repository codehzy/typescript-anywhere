// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVar:any = 'nice'

anyVar = false
anyVar = 'title'
anyVar = {
    site: "juejin"
}
anyVar = () => {}

// 标记为具体类型的变量也可以接受 any 类型的值
const va1: string = anyVar
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;

// 在 any 类型变量上任意地进行操作，包括赋值、访问、方法调用等等
let anyVar1: any = null;

anyVar1.foo.bar.baz();
anyVar1[0][1][2].prop1;

// 表达一个未知类型，更合理的方式是使用 unknown。
// 一个 unknown 类型的变量可以再次赋值为任意其它类型，但只能赋值给 any 与 unknown 类型的变量
let unknownVar: unknown = 'nice'

unknownVar = false
unknownVar = 'title'
unknownVar = {
    site: "juejin"
}
unknownVar = () => {}

// Error: 不能将类型“unknown”分配给类型“string”。
// const val5: string = unknownVar // error 
// const val6: number = unknownVar; // Error
// const val7: () => {} = unknownVar; // Error
// const val8: {} = unknownVar; // Error

const val9: any = unknownVar;
const val10: unknown = unknownVar;

// any 放弃了所有的类型检查，而 unknown 并没有
let unknownVar1: unknown;
// unknownVar1.foo() // error: 对象的类型为 "unknown"。

// 通过类型断言就 unknown 访问 
(unknownVar1 as { foo: () => {} }).foo()

// 虚无的 never 类型 - 代表 什么都没有
// type UnionWithNever = true | void | "hzy" | 599
type UnionWithNever = "hzy" | 599 | true | void | never;

declare let v1:never
declare let v2:void

// v1 = v2 // error 不能将类型“void”分配给类型“never”。

v2 = v1

// never 类型被称为 Bottom Type，是整个类型系统层级中最底层的类型
// 和 null、undefined 一样，它是所有类型的子类型，只有 never 类型的变量能够赋值给另一个 never 类型变量。

// 在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数：
function justThrow():never {
    throw new Error()
}

// 一旦一个返回值类型为never的函数被调用，下方的代码就会被视为无效代码
function foo(input: number){
    if(input > 1){
        justThrow()
        // 等同于 return 语句后的代码，即Dead code 
    }
}

declare const strOrNumOrBool: string | number | boolean

// ts的类型分析能力，每经过一个if语句处理分支就会减少一个类型，最后一个else只剩下never
// 。在这里，我们可以利用 never 类型变量仅能赋值给 never 类型变量的特性，来巧妙地分支处理检查
if(typeof strOrNumOrBool === 'string'){
    console.log("str!");
} else if(typeof strOrNumOrBool === 'number'){
    console.log("num!");
} else if(typeof strOrNumOrBool === 'boolean'){
    console.log("bool!");
} else{
    throw new Error(`Unknown input type: ${strOrNumOrBool}`)
}


declare const strOrNumOrBoolOrFunc: string | number | boolean | Function

// 这个处理，比如同事新增了一个类型分支，strOrNumOrBool 变成了 strOrNumOrBoolOrFunc
// 却忘记新增对应的处理分支，此时在 else 代码块中就会出现将 Function 类型赋值给 never 类型变量的类型错误。
if (typeof strOrNumOrBoolOrFunc === "string") {
    // 一定是字符串！
  strOrNumOrBoolOrFunc.charAt(1);
} else if (typeof strOrNumOrBoolOrFunc === "number") {
  strOrNumOrBoolOrFunc.toFixed();
} else if (typeof strOrNumOrBoolOrFunc === "boolean") {
  strOrNumOrBoolOrFunc === true;
} else {
  // error: 不能将类型“Function”分配给类型“never”。
  const _exhaustiveCheck: never = strOrNumOrBoolOrFunc; 
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}

const arr = []
arr.push("code"); // 类型“string”的参数不能赋给类型“never”的参数。


// 类型断言
const test1: string = 'code1';
(test1 as any).func().foo().prop

// 联合类型中断言一个具体分支
function foo(union:string | number){
    if((union as string).includes('title')){ }

    if((union as number).toFixed() === '599'){ }
}

// 双重断言
const test2: string = "code1";
// 类型 "string" 到类型 "{ handler: () => {}; }" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
// (str as { handler: () => {} }).handler()

(str as unknown as { handler: () => {} }).handler()

// 非空断言
declare const fooTest1: {
    func?: () => ({
        props?: number | null
    })
}

// fooTest1.func().prop.toFixed()

fooTest1.func!().props!.toFixed()


// 非空断言的常见场景还有 document.querySelector、Array.find 方法

const element = document.querySelector('#id')
const target = [1, 2, 3, 599].find(item => item === 599)!;