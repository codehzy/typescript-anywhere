/**
 * 1. 字面量类型
 */

// 响应结果为例
interface Res {
    code: 1000 | 1001 | 1002,
    status: 'success' | 'failure',
    data: any
}

declare var res: Res

// 提示： 很精确的进行类型推倒
// if(res.status === "")


// 字面量类型
// 字面量类型（Literal Types），它代表着比原始类型更精确的类型，同时也是原始类型的子类型
// 主要包括字符串字面量类型、数字字面量类型、布尔字面量类型和对象字面量类型

const str: 'code' = 'code'
const num: 599 = 599
const bool: true = true

// 字面量类型更精确
const str1: 'code' = 'code'

const str2: string = 'code1'
const str3: string = 'code2'


// 很少单独使用字面量类型，通常和联合类型一起使用
interface Tmp {
    bool: true | false,
    num: 1 | 2 | 3,
    str: 'c' | 'o' | 'd' | 'e'
}

/**
 * 2. 联合类型
 */

// 它代表了一组类型的可用集合
interface Tmp {
    mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
}

// 联合类型常使用的场景: 多个对象类型的联合，来实现手动互斥属性

interface Tmp {
    user: | {
        vip: true,
        expires: string
    } | {
        vip: false,
        expires: string
    }
}

declare var tmp: Tmp
//判断以后，接下来类型会收窄到vip用户的类型
if (tmp.user.vip) {
    console.log(tmp.user.expires);
}

/**
 * 3. 对象字面量类型
 */

// 无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值
interface Tmp1 {
    obj: {
        name: 'code',
        age: 19
    }
}

const tmp11: Tmp1 = {
    obj: {
        name: 'code',
        age: 19
    }
}

/**
 * 4. 枚举： enum
 */

enum PageUrl {
    Home_Page_Url = "url1",
    Setting_Page_Url = "url2",
    Share_Page_Url = "url3",
}

const home = PageUrl.Home_Page_Url

// 如果没给枚举值，则会默认从0开始赋值
enum Items {
    // 0
    Foo,
    Bar = 599,
    // 600
    Baz
}

const returnNum = () => 100 + 499

// 如果你使用了延迟求值，那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后（如上例），或者放在第一位
enum Items1 {
    Foo = returnNum(),
    Bar = 599,
    Baz
}

enum Items2 {
    Baz,
    Foo = returnNum(),
    Bar = 599
}

// 同时使用字符串枚举值和数字枚举值
enum Mixed {
    Num = 599,
    Str = 'code'
}

// 枚举和对象的重要差异在于，对象是单向映射的，我们只能从键映射到键值。
// 而枚举是双向映射的
// 可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员

enum Items3 {
    Foo,
    Bar,
    Baz
}

const fooValue = Items3.Foo // 0
const fooKey = Items3[0] // Foo

/**
 * 5. 常量枚举
 */

const enum Items4 {
    Foo,
    Bar,
    Baz
}

const fooValue1 = Items4.Foo