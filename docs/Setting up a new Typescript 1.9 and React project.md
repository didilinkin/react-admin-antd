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

# 5. 向项目添加`React`

### 1. 安装 `React` 到 `node_modules`:
```bash
npm i -S react
```

### 2. 为了演示我们要做什么，`mkdir src`并在其中创建一个包含基本（无状态）React组件的文件`index.tsx`：

```js
import * as React from 'react';

export default () => <div>Hello world</div>;
```

如果您的编辑器设置正确，您应该已经看到它突出显示导入*的问题作为反应从`“React”`; 但是要进一步展示，从您的项目根运行`tsc`，您应该得到以下输出：

```bash
src/index.tsx(1,24): error TS2307: Cannot find module 'react'.
```

这里的问题是React的Typescript类型声明没有被安装，所以Typescript表示它找不到模块，因为`import`的任何模块都需要类型声明（错误信息不能使这一点非常清楚！）。

不过，有趣的是，`tsc`已经创建了一个`ts-build`目录，并在其中编写了`index.jsx`，并且具有合理的内容 - 一般来说，即使有错误，Typescript编译器也会尝试发出代码，只要它们是 '致命（尽管这可以在`tsconfig.json`中使用`noEmitOnError`选项禁用）。

### 3. 在安装React的类型声明之前，我们首先需要检查它们是否存在

大多数类型声明文件是由社区而不是库作者创建的，但大多数流行的库都被覆盖。

  类型声明系统已经通过几次迭代的工具（第一个`tsd`，然后`typings`），但是现在正在以纯粹的`npm`为基础。 原始定义存在于大量的DefinitelyTyped Github回购中，并自动同步到`npm`。

  在`npm`中检查包是否具有类型声明的唯一方法是在[http://microsoft.github.io/TypeSearch/](http://microsoft.github.io/TypeSearch/)中进行搜索，并输入`React`，确实有一个定义，在`npm`上托管在[https：//www.npmjs.com/package/@types/react](https：//www.npmjs.com/package/@types/react)。

  `typings`系统的以前的迭代有能力从命令行搜索，这在大多数情况下是可取的，所以希望有人会填补这个差距，用于基于`npm`的类型声明 - 现在可以安装`typings`（[https://github.com/typings/typings](https://github.com/typings/typings)），并使用它来搜索DefinitelyTyped，或者只是使用Google / GitHub / npm搜索。

### 4. 现在我们知道反应类型声明存在于 `@types/react`，我们可以用`npm`安装它们：

```bash
npm i -D @types/react
```

现在，`tsc`和您的编辑器应该对React导入感到满意。 在这一点上，您也可以通过键入`React`来获得自动完成Typescript启用的感觉。 `index.tsx`文件的某处，并使用正确的选项查看自动完成下拉列表。

### 5. 我们还需要`react-dom`包，可以以相同的方式安装:

```bash
npm i -S react-dom
npm i -D @types/react-dom
```

  在我看来，类型声明在`devDependencies`中是有意义的（所以`npm -D`而不是`npm -S`）。 另请注意，类型声明包名称的结构始终为`@types/<npm_package_name>`，因此您可以利用此命名方案，并尝试根据其名称安装给定包的类型，而不是在大多数情况下使用搜索。

  另一件值得注意的事情是，目前版本的`React typings`是`0.14`，而我们使用React `0.15` - 这是社区维护的类型声明的一个缺点，但在大多数情况下它不会出现太多的问题 （只要API没有太大变化）。 当然，如果它们不同步（或者使用本地类型声明“覆盖”来增加它们），或者在极端情况下，不用打印输入模块就可以将PR定义为DefinitelyTyped来修复类型def 在那以后）。

# 6. 安装 `webpack` 与 `Babel`

如上所述，我们正在使用Babel从Typescript中转移到ES6输出，以便我们可以利用Babel插件生态系统和Webpack作为我们的模块捆绑器; 所以我们需要设置Webpack来调用Typescript加载器，然后将输出传递给Babel。 我将不会在Webpack设置中过多的细节，因为它本身就是一个很大的话题！

1. 安装`Webpack`本身
  和便利的通知程序插件，它将通过您的系统通知程序通知您构建状态（特别适用于`Typescript`，因为代码将在每次保存文件时进行编译，因此这种表面编译错误比观看终端要快得多）：

  ```bash
  npm i -D webpack webpack-notifier
  ```

2. Install the `Webpack Typescript loader`
  所以Webpack可以处理编译Typescript作为捆绑过程的一部分：

  ```bash
  npm i -D ts-loader
  ```

3. 安装`Babel`本身，Babel Webpack加载器和几个预设

  所以它可以理解Typescript编译器将输出的ES6和JSX代码（我不知道stage-0是否是严格必要的，`stage-3`可能足够用于`async/await`支持）

  ```bash
  npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
  ```

4. 创建一个 `.babelrc` 文件, 在项目根中，告诉Babel使用我们刚刚安装的预设

  ```json
  {
    "presets": ["es2015", "react", "stage-0"]
  }
  ```

5. 创建一个 `webpack`配置 在 `config/webpack.config.js`
  告诉Webpack如何构建和捆绑项目。 我已经添加了解释内部正在发生的事情的评论：

  ```js
  var webpack = require('webpack');
  var path = require('path');
  var WebpackNotifierPlugin = require('webpack-notifier');

  module.exports = {
    devtool: 'eval',
    // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
    entry: [
      'index.tsx'
    ],
    // Output the bundled JS to dist/app.js
    output: {
      filename: 'app.js',
      path: path.resolve('dist')
    },
    resolve: {
      // Look for modules in .ts(x) files first, then .js(x)
      extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
      // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
      modulesDirectories: ['src', 'node_modules'],
    },
    module: {
      loaders: [
        // .ts(x) files should first pass through the Typescript loader, and then through babel
        { test: /\.tsx?$/, loaders: ['babel', 'ts-loader'] }
      ]
    },
    plugins: [
      // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
      new WebpackNotifierPlugin({ alwaysNotify: true }),
    ]
  };
  ```

### 6. 添加一个脚本来调用Webpack
  当你运行 `npm run build` 到你的`package.json`：

  ```bash
  "scripts": {
    "build": "webpack --config config/webpack.config.js"
  },
  ```

### 7. 您现在应该可以使用Webpack**构建项目**：

```bash
npm run build
```

并且看到它已经在`dist/ app.js`创建了一个输出文件（你可能想要`gitignore`的`dist`目录）。

# 7. 添加热模块重新加载

就快到了！ 剩下的一切就是将热模块重新加载到项目中。

实际上，这是完全可选的，但是我发现在React项目上工作非常宝贵，所以可以考虑任何一个项目的设置。

它也不是真的Typescript特定的，但是没有很多很好的指南来设置最新版本的`HMR`，并且设置它让我们有机会看到一些更多关于使用Typescript的提示。

### 1. 创建一个 `index.html` 文件
  这将加载捆绑的JS，并在某处将React安装到应用程序。 在项目根目录下创建文件，内容如下：

  ```html
  <!DOCTYPE html>

  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My Typescript App</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="dist/app.js"></script>
    </body>
  </html>
  ```

### 2. 下一步, 安装 `react-hot-loader`这个`npm`依赖包. 我们使用最新的3.0.0 beta版本，因为它支持无状态功能组件。

  ```bash
  npm i -D react-hot-loader@3.0.0-beta.2
  ```

### 3. 添加 `react-hot-loader` 插入到 `.babelrc`文件. 所以现在包含：

```json
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": ["react-hot-loader/babel"]
}
```

### 4. 安装 `webpack-dev-server` 这个`npm`依赖包. 允许我们设置一个dev服务器来处理热模块重新加载：

```bash
npm i -D webpack-dev-server
```

### 5. 在项目根目录`server.js`中的新文件中创建dev服务器，其中包含以下内容（基于[https://github.com/gaearon/react-hot-boilerplate/blob/next/server.js](https://github.com/gaearon/react-hot-boilerplate/blob/next/server.js)）:

```js
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
```

### 6. **修改`config/webpack.config.js`以启用Webpack支持热模块重新加载**，因此现在包含以下内容（解释性注释内联）：

```js
var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'eval',
  entry: [
    // Add the react hot loader entry point - in reality, you only want this in your dev Webpack config
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'index.tsx'
  ],
  output: {
    filename: 'app.js',
    publicPath: '/dist',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ['babel', 'ts-loader'] }
    ]
  },
  plugins: [
    // Add the Webpack HMR plugin so it will notify the browser when the app code changes
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ]
};
```

### 7. 添加一个脚本来启动dev服务器，使用`npm start`你的`package.json`：

```json
"scripts": {
  "build": "webpack --config config/webpack.config.js",
  "start": "node server.js"
},
```

### 8. 最后，我们需要**创建一个适合热模块重新加载的框架应用程序**。

我们的入门点需要设置，以便它可以处理热重新加载应用程序的请求。 打开`src / index.tsx`并将其更改为以下内容（内部解释性注释）：

```js
// Import React and React DOM
import * as React from 'react';
import { render } from 'react-dom';
// Import the Hot Module Reloading App Container – more on why we use 'require' below
const { AppContainer } = require('react-hot-loader');

// Import our App container (which we will create in the next step)
import App from 'containers/App';

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

// Get the root element from the HTML
const rootEl = document.getElementById('app');

// And render our App into it, inside the HMR App ontainer which handles the hot reloading
render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // If we receive a HMR request for our App container, then reload it using require (we can't do this dynamically with import)
    const NextApp = require('./containers/App').default;

    // And render it into the root element again
    render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      rootEl
    );
  })
}
```

实际上，这使我们的应用程序在一个特殊的容器（`react-hot-loader AppContainer`）中，然后等待`Webpack`通知任何应用程序文件的任何更改（将触发`HMR`请求，最终冒泡起来 顶级父模块，`containers/App`）。 当检测到更改时，将重新加载整个`App`容器，并将DOM中的现有实例替换为新的修改的容器。

这里的诀窍是，`react-hot-loader` `AppContainer`在重新加载组件（无论是本地状态还是Redux或类似的）中都会保留状态，因此在大多数情况下，我们不会丢失我们在应用程序。

一些关于几件事情的简要说明：

## 导入没有类型声明的模块

```js
const { AppContainer } = require('react-hot-loader');
```

在这里，我们正在使用`require`而不是`import`。 这是一个有用的技巧，因为它允许您导入`npm`模块，而不需要任何类型的声明。

在这种情况下，目前没有`react-hot-loader`的类型声明，但是如果我们使用`require`，它被视为`any`类型。 这对于使用没有类型声明的模块非常方便，特别是如果您只是尝试使用模块来查看它们是否合适，并且不想担心键入它们。

如果你使用`const Whatever = require（'whatever'）`; 而不是`import`从“任何”的任何东西，Typescript不会抱怨`无法找到模块`( 无法找到模块 ) - 虽然它也不会提供任何类型的安全性，当使用此模块！

请看下一步重要的注释 - 默认情况下，Typescript不知道需要`require`什么方法（因为它不是内置的Javascript结构）。

## 声明全局变量

```js
declare var module: { hot: any };
```

`声明`我们如何能够告诉Typescript关于它尚不知道的全局变量。 在这里，我们告诉它，一个名为`module`的全局变量将会存在，它的类型将是一个对象，它有一个名为`hot`的对象，它的值为`any`（这意味着它不会被类型检查） 一个检查，一般应该避免`any`类型，但这可以为我们的目的在这里）。

### 9. 如果你现在运行tsc，你会得到一个错误：

```js
src/index.tsx(5,26): error TS2304: Cannot find name 'require'.
```

这是因为Typescript不知道需要什么`require`。 这有几种方法，例如安装`node`或`requirejs`类型声明，但是在[https://github.com/TypeStrong/ts-loader#loading-other-resources-and-code-splitting](https://github.com/TypeStrong/ts-loader#loading-other-resources-and-code-splitting)中推荐使用该类型声明 很好地使用CSS模块是为了创建自己的`require`声明 - 这也让我有机会展示如何创建我们自己的本地类型的声明库！


这取决于你想保留本地类型的声明，但是我会建议一个名为`type-declaration`的顶级目录。 如果您使用`tsconfig.json`的默认`exclodu`模式，则整个项目中除`node_modules`之外的任何`* .ts`文件将自动包含在编译中，因此我们不需要明确告知Typescript我们已经将声明放在哪里。

类型声明文件具有扩展名`.d.ts`，并且可以在全局或命名的模块范围内声明类型（这是大多数第三方库定义的写入方式，因此在导入模块时，这些类型仅适用于范围）。 类型声明如何工作的细节超出了本指南的范围，但现在在项目根目录中的名为`type-declaration`的目录中创建一个名为`require.d.ts`的文件，其中包含以下内容：

```js
declare var require: {
    (path: string): any;
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
```

再次运行`tsc`，并且应该删除警告（只有一个关于`containers/App`仍然存在） - 我们已经告诉Typescript，用单个字符串参数调用`require`需要返回`any`类型的变量。

创建本地类型声明的这种技术也可能是有用的，如果一个库的声明是过时的或不准确的 - 你可以添加导出的变量或其他属性到现有的接口，如此（尽管如果真的最好将这些更改提交给DefinitelyTyped如果时间允许）：

```js
declare module "redux-form" {
    export var change: any

    export interface ReduxFormConfig {
        alwaysAsyncValidate?: boolean
    }
}
```

### 10. 最后一步：我们需要创建我们实际的`App`容器组件。 现在我们将创建一个占位符，但实际上这将是您应用程序的根本部分（例如您的`<Router>`所在的位置）。

创建一个新目录`src/containers`，并在其中创建一个新文件`App.tsx`，其中包含以下内容：

```js
import * as React from 'react'

export default () => <div>Hello world</div>
```

现在你应该可以启动你的dev服务器了：

```bash
npm start
```

并转到[http://127.0.0.1:3000](http://127.0.0.1:3000)看“Hello World”的消息！ 更新`App.tsx`文件来说别的东西，你应该看到应用程序热重新加载。

# 8. 下一步 / Next steps

这基本上是在项目设置方面.

如开始所述，完整的模板可以在[https://github.com/tomduncalf/typescript-react-template](https://github.com/tomduncalf/typescript-react-template)中找到 - 我认为，通过每一步，了解为什么第一次需要，但是在未来是有帮助的，您可以使用您创建的模板作为新项目的起点。

在接下来的步骤中，它只是一个像往常一样构建应用程序的一个例子，但是利用Typescript的类型检查和编辑器集成。唯一真正的痛点可能是与第三方库的类型声明一起使用，但是使用npm进行打字更容易，而且始终可以使用require导入库，也可以绕过首先需要类型声明。

我打算更多地关于使用Typescript和React，但希望这是一个有用的开始 - 任何问题，意见或反馈都非常受欢迎，通过评论，或通过Twitter或电子邮件。
