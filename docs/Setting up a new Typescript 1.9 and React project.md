# 设置一个新的Typescript 1.9和React项目

> [原文地址]( http://blog.tomduncalf.com/posts/setting-up-typescript-and-react/#setting-up-webpack-and-babel )

* ### 1. 介绍
* ### 2. 编辑器设置
    * #### Visual Studio Code
* ### 3. 基本项目设置
    * #### VS代码用户注意事项
* ### 4. 设置tsconfig.json
* ### 5. 向项目添加`React`
* ### 6. 设置Webpack和Babel
* ### 7. 添加热模块重新加载
    * #### 导入没有类型声明的模块
    * #### 声明全局变量
* ### 8. 下一步

***

# 1. 介绍 / Introduction

这篇文章是一个大脑转载建立一个Typescript和React项目所需的步骤和一些解释性的笔记 - 我打算写一篇关于在现实世界项目中更详细地使用Typescript和React的工作。

假设有一些React的知识和Typescript的基础知识。

这些说明将引导您使用Typescript，React，Webpack和Babel设计一个新项目 - 既不需要Webpack也不需要Babel来使用Typescript，因为Typescript可以将ES6转移到ES5并进行一定程度的捆绑;

但使用它们可以实现热模块重新加载，并且还允许您在编译输出上运行其他Babel和Webpack插件（如果需要）。

生成的项目模板可在Github上获得，网址为[https://github.com/tomduncalf/typescript-react-template](https://github.com/tomduncalf/typescript-react-template)。

# 2. 编辑器设置 / Editor setup

#### Visual Studio Code

Visual Studio代码用户不需要安装任何东西 - 它已经为Typescript设置了。

# 3. 基本设置 / Basic project setup

  1. ### **Install Typescript globally** - 这是可选的，但是在命令行中可以全局使用Typescript编译器tsc。 即使它仍处于测试阶段，我们将使用typescript @ next（版本1.9.x），因为它支持从npm安装类型声明，而不必使用打字工具，这是使用类型声明文件的未来，并使生活 更容易
  ```bash
  npm install -g typescript@next
   ```

   ## VS Code 用户注意事项:

   > 如果您使用VS Code，您需要告诉它使用您用npm安装的Typescript编译器，否则您会收到语法错误，因为内部 VS Code 拼写编译器是v1.8，因此不支持安装类型声明 从npm。
   >
   > 为了做到这一点，你需要知道哪里的npm已经安装了全局包，你可以通过以下方式来检查：

   ```bash
   npm list -g | head -n1
   ```

   > 然后在 VS Code（Cmd +，Mac）中打开用户设置，并在用户设置中添加一行，将`typescript.tsdk`选项指向此位置的`node_modules / typescript / lib`目录
   >
   > 例如，如果全局 软件包安装到`/Users/td/.nvm/versions/node/v5.5.0/lib/`，然后添加以下内容并重新启动代码：

   ```bash
  {
    "typescript.tsdk": "/Users/td/.nvm/versions/node/v5.5.0/lib/node_modules/typescript/lib"
  }
   ```


   2. ### 创建一个新的项目
   ```bash
   mkdir my-project && cd my-project
   git init
   npm init -y
   ```
   3. ### 初始化Typescript项目

> 安装Typescript作为dev依赖关系并创建一个脚手架`tsconfig.json`：

   ```bash
   npm i -D typescript@next
   tsc --init
   ```

# 4. 设置tsconfig.json

### 1. `tsconfig.json` 控制Typescript编译器（`tsc`）的行为。 有一些对React和Babel项目有用的设置与默认值不同。 打开`tsconfig.json`并将其更改为以下内容
```json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "moduleResolution": "node",
    "baseUrl": "src",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": false,
    "sourceMap": true,
    "outDir": "ts-build",
    "jsx": "preserve"
  },
  "exclude": [
    "node_modules"
  ]
}
```

### 这一切都表示什么的说明：
* `“module”`：`“es6”`告诉`tsc`输出使用ES6模块规格（即`import`语句）的代码。 也可以将其设置为例如。 `commonjs`，在这种情况下，`tsc`会将您的代码转换为该模块规范，但是正如我们将我们编译的JS代码通过Webpack一样，我们可以将其保留为ES6，并让Webpack处理模块捆绑。


* `"target"`: `“es6”`告诉`tsc`输出ES6而不是ES5 Javascript代码。 我们想要这样做，因为我们将通过`Babel`运行编译的JS，并且在编译之后保持ES6代码对于一些Babel插件可能是有用的（例如，`transform-react-stateless-component-name`，它自动命名无状态组件，只会接收 箭头功能）。

  这也使我们可以使用`Async / await`，这是`Typescript`所理解的，但目前不能被篡改 - 相反，我们可以使用Babel来处理`async`代码的转移。 如果我们没有使用Babel，这个设置可以省略或者设置为`es5`，以使`tsc`做ES6本身的转换。

* `“modulesResolution”`：`“node”`告诉`tsc`使用Node模块解决策略。 这允许`Typescript`加载与`npm`软件包一起提供的类型声明（例如，`MobX`在主`mobx`软件包中包含其自己的类型声明），并且使用`baseUrl`选项，可以使用绝对式导入本地模块。

* `“baseUrl”`：`“src”`告诉`tsc`在`src`中查找在`node_modules`中找不到的任何我们导入的模块。 这允许我们为本地模块编写绝对风格的导入，例如 `import Whatever from 'components/Whatever'`而不是从`“../components/Whatever”`中输入什么，这对于理智而言是伟大的。

  **请注意，此设置不适用于当前版本的`atom-typescript`**（请参阅[https://github.com/TypeStrong/atom-typescript/pull/849](https://github.com/TypeStrong/atom-typescript/pull/849)） - 如果要使用Atom，请从`tsconfig.json`中删除此行。 您可以通过使用`“moduleResolution”：“classic”`（它会走到目录树，直到发现匹配，所以不一样的行为，但在许多情况下类似的最终结果））可以获得绝对样式导入的近似值，但是 这打破了自动导入`npm`包提供的类型声明的能力。

* `“allowSyntheticDefaultImports”：true`允许我们对没有默认`import`的`npm`模块使用ES6导入语法。

* `“noImplicitAny”：false`告诉`tsc`不要警告我们，如果任何变量被推断为具有`any`。 这实际上可能是很好的做法，将其设置为`true`，但它的确意味着您可能需要使用类型注释更自由。

* `“sourceMap”：true`告诉`tsc`输出源地图，这样可以更容易地从浏览器进行调试，因为它可以告诉您在原始`.ts`源文件中发生错误的位置，而不仅仅是在编译的`.js`中。

* `“outDir”：“ts-build”`告诉`tsc`将编译的`.js`文件输出到名为`ts-build`的目录（可以是`.gitignored`）。 默认是将它们与原始`.ts`源文件一起输出，但这会变得混乱。 应该注意的是，大多数时候，我们不会将编译的`.js`输出到磁盘，因为Webpack加载器将在内存中进行编译，但是有时可以手动调用`tsc`并检查编译的输出。

* `“jsx”：“preserve”`告诉`tsc`离开JSX代码，这意味着别的东西（在这种情况下，Babel）负责将其编译为`React.createElement`函数调用。 可以将其设置为`“react”`，这将导致`tsc`直接输出`React.createElement`调用，但将原始JSX可用于Babel可能是有用的，例如。 为插件进行处理。

* 我们 `exclude node_modules`，因为我们不希望`tsc`尝试和编译在其中找到的任何东西 - 或者可以显式地`include`用于编译的文件（或者使用非标准的`filesGlob`选项，这允许您指定通配符模式，由 Atom插件和[https://github.com/TypeStrong/tsconfig](https://github.com/TypeStrong/tsconfig)）







# 8. 下一步 / Next steps

这基本上是在项目设置方面.

如开始所述，完整的模板可以在[https://github.com/tomduncalf/typescript-react-template](https://github.com/tomduncalf/typescript-react-template)中找到 - 我认为，通过每一步，了解为什么第一次需要，但是在未来是有帮助的，您可以使用您创建的模板作为新项目的起点。

在接下来的步骤中，它只是一个像往常一样构建应用程序的一个例子，但是利用Typescript的类型检查和编辑器集成。唯一真正的痛点可能是与第三方库的类型声明一起使用，但是使用npm进行打字更容易，而且始终可以使用require导入库，也可以绕过首先需要类型声明。

我打算更多地关于使用Typescript和React，但希望这是一个有用的开始 - 任何问题，意见或反馈都非常受欢迎，通过评论，或通过Twitter或电子邮件。
