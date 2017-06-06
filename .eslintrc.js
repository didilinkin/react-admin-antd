/*
 * 本规范由 'JavaScript Standard Style' 规范 —— 添加自定义内容 组成的加强版
 * Standard规则 中文文档 : https://github.com/feross/standard/blob/master/docs/RULES-zhcn.md
 * ESlint规则 中文文档: http://eslint.cn/docs/rules/
 */
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },

    "extends": ["react-app"],
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "plugins": [
        "react"
    ],
    // React-eslint
    "settings": {
      "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "version": "15.0" // React version, default to the latest React stable release
      }
    },
    "rules": {
        // 以下规则为 'Standard' 规范( 无修改 )
        // "indent": [ "error", 2 ],                                                   // 两格缩进
        "quotes": [ "error", "single" ],                                            // 必须使用单引号
        "no-unused-vars": "error",                                                  // 不要定义未使用的变量
        "keyword-spacing": [ "error", { "before": true } ],                         // 关键字后面加空格
        "space-before-function-paren": "error",                                     // 函数声明时括号与函数名间加空格
        "eqeqeq": [ "error", "always" ],                                            // 使用 === 替代 ==
        "space-infix-ops":  "error",                                                // 字符串拼接操作符 (Infix operators) 之间要留空格
        "comma-spacing": [ "error", { "before": false, "after": true } ],           // 逗号前面禁止 加空格 / 逗号后面必须 加空格
        "brace-style": "error",                                                     // 关键字要与花括号保持在同一行
        "curly": "error",                                                           // 多行 if 语句的的括号不能省
        "handle-callback-err": "error",                                             // 不要丢掉异常处理中err参数
        "no-undef": "error",                                                        // 使用浏览器全局变量时加上 window. 前缀
        "no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 1 }],            // 不允许有连续多行空行
        // "operator-linebreak": [ "error", "after" ],                                 // 对于三元运算符 ? 和 : 与他们所负责的代码处于同一行( 所有的运算符必须在同一行 )
        "one-var": [ "error", { var: "never", let: "never", const: "never" } ],     // 每个 var 关键字单独声明一个变量
        "no-cond-assign": "error",                                                  // 条件语句中赋值语句使用括号包起来。这样使得代码更加清晰可读，而不会认为是将条件判断语句的全等号（===）错写成了等号（=）
        "block-spacing": "error",                                                   // 单行代码块两边加空格
        "camelcase": "error",                                                       // 对于变量和函数名统一使用驼峰命名法
        "comma-dangle": [ "error", "never" ],                                       // 不允许有多余的行末逗号
        "comma-style": [ "error", "last" ],                                         // 始终将逗号置于行末
        "dot-location": [ "error", "object" ],                                      // 点号操作符须与属性需在同一行
        "eol-last": [ "error", "always" ],                                          // 文件末尾留一空行
        "func-call-spacing": ["error", "never"],                                    // 函数调用时标识符与括号间不留间隔
        "key-spacing": [ "error", { "beforeColon": false } ],                       // 键值对当中冒号与值之间要留空白
        "new-cap" : "error",                                                        // 构造函数要以大写字母开头
        "new-parens": "error",                                                      // 无参的构造函数调用时要带上括号
        "accessor-pairs": "error",                                                  // 对象中定义了存值器，一定要对应的定义取值器
        "constructor-super": "error",                                               // 子类的构造器中一定要调用 super
        "no-array-constructor": "error",                                            // 使用数组字面量而不是构造器( 禁止使用 Array 构造函数 )
        "no-caller": "error",                                                       // 避免使用 arguments.callee 和 arguments.caller
        "no-class-assign": "error",                                                 // 避免对类名重新赋值
        "no-const-assign": "error",                                                 // 避免修改使用 const 声明的变量
        "no-constant-condition": "error",                                           // 避免使用常量作为条件表达式的条件( 循环语句除外 )
        "no-control-regex": "error",                                                // 正则中不要使用控制符
        //"no-debugger": "error",                                                     // 不要使用 debugger
        "no-delete-var": "error",                                                   // 不要对变量使用 delete 操作
        "no-dupe-args": "error",                                                    // 不要定义冗余的函数参数
        "no-dupe-class-members": "error",                                           // 类中不要定义冗余的属性
        "no-dupe-keys": "error",                                                    // 对象字面量中不要定义重复的属性
        "no-duplicate-case": "error",                                               // switch 语句中不要定义重复的 case 分支
        "no-duplicate-imports": "error",                                            // 同一模块有多个导入时一次性写完
        "no-empty-character-class": "error",                                        // 正则中不要使用空字符
        "no-empty-pattern": "error",                                                // 不要解构空值
        "no-eval": "error",                                                         // 不要使用 eval()
        "no-ex-assign": "error",                                                    // catch 中不要对错误重新赋值
        "no-extend-native": "error",                                                // 不要扩展原生对象
        "no-extra-bind": "error",                                                   // 避免多余的函数上下文绑定
        "no-extra-boolean-cast": "error",                                           // 避免不必要的布尔转换
        // "no-extra-parens": "error",                                                 // 不要使用多余的括号包裹函数
        "no-fallthrough": "error",                                                  // switch 一定要使用 break 来将条件分支正常中断
        "no-floating-decimal": "error",                                             // 不要省去小数点前面的0
        "no-func-assign": "error",                                                  // 避免对声明过的函数重新赋值
        "no-global-assign": "error",                                                // 不要对全局只读对象重新赋值
        "no-implied-eval": "error",                                                 // 注意隐式的 eval()
        "no-inner-declarations": "error",                                           // 嵌套的代码块中禁止再定义函数
        "no-invalid-regexp": "error",                                               // 不要向 RegExp 构造器传入非法的正则表达式
        "no-irregular-whitespace": "error",                                         // 不要使用非法的空白符
        "no-iterator": "error",                                                     // 禁止使用 __iterator__
        "no-label-var": "error",                                                    // 外部变量不要与对象属性重名
        "no-labels": "error",                                                       // 不要使用标签语句
        "no-lone-blocks": "error",                                                  // 不要书写不必要的嵌套代码块
        "no-mixed-spaces-and-tabs": "error",                                        // 不要混合使用空格与制表符作为缩进
        // "no-multi-spaces": "error",                                                 // 除了缩进，不要使用多个空格
        "no-multi-str": "error",                                                    // 不要使用多行字符串
        "no-new": "error",                                                          // new 创建对象实例后需要赋值给变量
        "no-new-func": "error",                                                     // 禁止使用 Function 构造器
        "no-new-object": "error",                                                   // 禁止使用 Object 构造器
        "no-new-require": "error",                                                  // 禁止使用 new require
        "no-new-symbol": "error",                                                   // 禁止使用 Symbol 构造器
        "no-new-wrappers": "error",                                                 // 禁止使用原始包装器
        "no-obj-calls": "error",                                                    // 不要将全局对象的属性作为函数调用
        "no-octal": "error",                                                        // 不要使用八进制字面量
        "no-octal-escape": "error",                                                 // 字符串字面量中也不要使用八进制转义字符
        "no-path-concat": "error",                                                  // 使用 __dirname 和 __filename 时尽量避免使用字符串拼接
        "no-proto": "error",                                                        // 使用 getPrototypeOf 来替代 __proto__
        "no-redeclare": "error",                                                    // 不要重复声明变量
        "no-regex-spaces": "error",                                                 // 正则中避免使用多个空格
        "no-return-assign": "error",                                                // return 语句中的赋值必需有括号包裹
        "no-self-assign": "error",                                                  // 避免将变量赋值给自己
        "no-self-compare": "error",                                                 // 避免将变量与自己进行比较操作
        "no-sequences": "error",                                                    // 避免使用逗号操作符
        "no-shadow-restricted-names" : "error",                                     // 不要随意更改关键字的值
        "no-sparse-arrays": "error",                                                // 禁止使用稀疏数组（Sparse arrays）
        "no-tabs" : "error",                                                        // 不要使用制表符
        "no-template-curly-in-string" : "error",                                    // 正确使用 ES6 中的字符串模板
        "no-this-before-super": "error",                                            // 使用 this 前请确保 super() 已调用
        "no-throw-literal": "error",                                                // 用 throw 抛错时，抛出 Error 对象而不是字符串
        "no-trailing-spaces": "error",                                              // 行末不留空格
        "no-undef-init": "error",                                                   // 不要使用 undefined 来初始化变量
        "no-unmodified-loop-condition": "error",                                    // 循环语句中注意更新循环变量
        "no-unneeded-ternary" : "error",                                            // 如果有更好的实现，尽量不要使用三元表达式
        "no-unreachable": "error",                                                  // return，throw，continue 和 break 后不要再跟代码
        "no-unsafe-finally" : "error",                                              // finally 代码块中不要再改变程序执行流程
        "no-unsafe-negation": "error",                                              // 关系运算符的左值不要做取反操作
        "no-useless-call": "error",                                                 // 避免不必要的 .call() 和 .apply()
        "no-useless-computed-key": "error",                                         // 避免使用不必要的计算值作对象属性
        "no-useless-constructor": "error",                                          // 禁止多余的构造器
        "no-useless-escape": "error",                                               // 禁止不必要的转义
        "no-useless-rename": "error",                                               // import, export 和解构操作中，禁止赋值到同名变量
        "no-whitespace-before-property": "error",                                   // 属性前面不要加空格
        "no-with": "error",                                                         // 禁止使用 with
        "object-property-newline": "error",                                         // 对象属性换行时注意统一代码风格
        "padded-blocks": [ "error", "never" ],                                                   // 代码块中避免多余留白
        "rest-spread-spacing": "error",                                             // 展开运算符与它的表达式间不要留空白
        "semi-spacing": "error",                                                    // 遇到分号时空格要后留前不留
        "space-before-blocks": "error",                                             // 代码块首尾留空格
        "space-in-parens": "error",                                                 // 圆括号间不留空格
        "space-unary-ops": "error",                                                 // 一元运算符后面跟一个空格
        "spaced-comment": "error",                                                  // 注释首尾留空格
        "template-curly-spacing": "error",                                          // 模板字符串中变量前后不加空格
        "use-isnan": "error",                                                       // 检查 NaN 的正确姿势是使用 isNaN()
        "valid-typeof": "error",                                                    // 用合法的字符串跟 typeof 进行比较操作
        "wrap-iife": "error",                                                       // 自调用匿名函数 (IIFEs) 使用括号包裹
        "yield-star-spacing": "error",                                              // yield * 中的 * 前后都要有空格
        "yoda": "error",                                                            // 请书写优雅的条件语句（avoid Yoda conditions）
        "semi": [ "error", "never" ],                                               // 不要使用分号
        "no-unexpected-multiline": "error",                                         // 禁止使用令人困惑的多行表达式

        // 加强内容
        "no-console": "off",                                                        // 禁止使用 console( 上线时. 放开此规则 )
        "no-var": "error",                                                          // 严禁使用 var; 强制要求使用 let 或 const( 防止变量提升 )
        "no-empty": "error",                                                        // 禁止空块语句
        "no-extra-semi": "error",                                                   // 禁用不必要的多余分号
        "no-unused-labels": "error",                                                // 禁用未使用过的标签
        "wrap-iife": ["error", "outside"],                                          // 需要把立即执行的函数包裹起来
        "no-undefined": "error",                                                    // 禁止将 undefined 作为标识符
        "require-yield": "error",                                                   // 禁用函数内没有yield的 generator 函数

        // React JSX内容
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-space-before-closing": 1,                                        // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
        "jsx-quotes": ["error", "prefer-double"],                                   // JSX 强制使用单引号
        "react/jsx-closing-bracket-location": 1,                                    // 遵循JSX语法缩进/格式
        "react/jsx-boolean-value": 1,                                               // 如果属性值为 true, 可以直接省略
        "react/no-string-refs": 1,                                                  // 总是在Refs里使用回调函数
        "react/self-closing-comp": 1,                                               // 对于没有子元素的标签来说总是自己关闭标签
        "react/sort-comp": 1,                                                       // 按照具体规范的React.createClass 的生命周期函数书写代码
        "react/jsx-pascal-case": 1,                                                 // React模块名使用帕斯卡命名，实例使用骆驼式命名

        // 修改规范内容
        "no-debugger": "off",
        "no-extra-parens": ["error", "functions" ],                                     // 只在函数中 - 不要使用多余的括号包裹函数
        "operator-linebreak": ["error", "after"],                                       // 对于三元运算符 ? 和 : 与他们所负责的代码处于同一行( 所有的运算符必须在同一行 )
        "no-multi-spaces": [ "error", { exceptions: { "ImportDeclaration": true } } ],  // 除了缩进，不要使用多个空格( 除了 'from' )
        "indent": ["error", 4]                                                          // 两格缩进
    }
};
