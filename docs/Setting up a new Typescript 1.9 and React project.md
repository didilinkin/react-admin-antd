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














# 8. 下一步 / Next steps

这基本上是在项目设置方面.

如开始所述，完整的模板可以在[https://github.com/tomduncalf/typescript-react-template](https://github.com/tomduncalf/typescript-react-template)中找到 - 我认为，通过每一步，了解为什么第一次需要，但是在未来是有帮助的，您可以使用您创建的模板作为新项目的起点。

在接下来的步骤中，它只是一个像往常一样构建应用程序的一个例子，但是利用Typescript的类型检查和编辑器集成。唯一真正的痛点可能是与第三方库的类型声明一起使用，但是使用npm进行打字更容易，而且始终可以使用require导入库，也可以绕过首先需要类型声明。

我打算更多地关于使用Typescript和React，但希望这是一个有用的开始 - 任何问题，意见或反馈都非常受欢迎，通过评论，或通过Twitter或电子邮件。
