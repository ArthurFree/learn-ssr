-	nodemon: 服务器端监听代码改动, 与supervisor差不多
-	cross-env NODE_ENV: 能够不分系统地在全局注入变量

-	node
	-	__dirname： 获取当前文件所在目录的完整目录名
	-	__filename： 获取当前模块文件的带有完整绝对路径的文件名

-	webpack
	-	context： 设置基础目录，一个绝对路径

	-	entry: 
		-	vendor： 将项目中的相互独立，互不依赖的外部引用打包在一起，通过CommonChunkPlugin

	-	output： 
		-	path： 输出目录的绝对路径
		-	publicPath： 输出目录的公共URL(参见：https://webpack.js.org/configuration/output/#output-path)

	-	resolve：
		-	alias： 别名
		-	extensions： 第一个值不能为空(即: "")

	-	devtool： 增强调试过程，一般选择`cheap-source-map`

	- 	cache： 缓存已生成webpack模块，提高打包速度(Cache the generated webpack modules and chunks to improve build speed)

	-	debug： 调试模式，在webpack2中被删除，并移入loader中
	-	module: 
		-	loaders: webpack2中修改为`rules`
	-	externals: 防止打包某些 import 的包(package)，而是在运行时再去获取这些外部扩展包(package)
	-	plugins： 
		-	HtmlwebpackPlugin: 将打包的js文件塞入html中,在页面中自动注入 js 和 css
		-	DefinePlugin: 允许你创建可以在编译时配置的全局常量
		-	ExtractTextPlugin: 将css文件从js文件中分离出来
		-	ProvidePlugin： 自动加载模块

-	css-loader: 是处理css文件中的url()等
-	style-loader: 将css插入到页面的style标签

-	webpack-dev-middleware - 使用中间件的方式，对于已有node服务或者希望完全控制服务器很有用
	
	-	中间件会使webpack的编译过程在内存中进行, 编译执行时会延迟请求直到编译完成
	-	使用koa框架构建web应用需要重新封装一下webpack-dev-middleware

-	Hot Module Replace
	-	entry中添加"webpack-hot-middleware/client?reload=true"，reload的意思是当不能hot replace的时候，就整页刷新
	
	-	plugins中添加插件`webpack.optimize.OccurrenceOrderPlugin(webpack2中修改,[修改内容在这里](http://stackoverflow.com/questions/37916005/typeerror-webpack2-default-optimize-occurenceorderplugin-is-not-a-function/37916006))`、`webpack.HotModuleReplacementPlugin`和`webpack.NoEmitOnErrorsPlugin(原为webpack.NoErrorsPlugin,webpack2中已修改)`
	-	OccurrenceOrderPlugin: 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID

-	???? 为什么要使用CSS Module ????




## webpack异步加载

webpack ensure 把js模块独立导出一个.js文件，然后使用这个模块的时候，webpack会构造script dom 元素,由浏览器发起异步请求这个js文件

场景分析：
比如应用的首页里有一个按钮，点击后可以打开某个地图。打开地图的话就要利用百度地图的js，我们不得不在首页中把百度地图的js一起打包进去首页，一个百度地图的js文件非常大，假设为1m，于是造成我们的首页打包的js非常大，用户代开首页的时间就比较长。

解决方法：

1. 将百度地图js分类出去，利用浏览器的并发请求js文件处理。为baidumap.js配置一个新的入口，这样就可以打包成两个js文件，都插入html即可（如果baidumap.js被多个入口文件引用的话，可以直接利用CommonsChunkPlugin，导出到一个公共模块即可）

2. 百度地图是用户点击了才弹出来的，也就是说，这个功能是可选的。那么久当用户点击的时候，在去下载百度地图的js。当用户点击的时候创建一个`script`标签来加载这个js文件
```
mapBtn.click(function() {
	// 获取文档head对象
	var head = document.querySelector("head");
	// 构建 <script>
	var script = document.createElement('script');
	// 设置src属性
	script.async = true;
	script.src = "http://map.baidu.com/.js"
	//加入到head对象中
	head.appendChild(script);
});
```
浏览器会自动帮我们发起请求，请求这个js文件，写个回调去定义在得到这个js文件之后操作

```
mapBtn.click(function () {
	require.ensure([], function() {
		var baidumap = require('./baidumap.js') // baidumap.js放在我们当前目录下
	})
})
```

参考：
> [webpack代码分离 ensure ](https://cnodejs.org/topic/586823335eac96bb04d3e305)



## Redux

概念：
-	`state`: app中状态存放的地方，并且state是只读的，不同于React，Redux中的state的更改，其实是创建了一个全新的state
-	`action`: 是一个对象，作用和他的名字一样，用来表明，你想要做的那件事情，改对象的属性type，用来标记，你要作的事情
-	`reducer`: 是一个函数，接受当前state，和一个action作为参数，依据action基于当前的`state`生成新的`state`
-	`dispatch`: 推送某个`action`给`reducer`
-	`异步action`: 返回一个函数，和中间件配合可以很容易的实现异步操作
-	`store`： 可以理解为`state`的家，全局只有一个，有以下方法
	-	`getState()`: 获取当前的state树
	-	`dispatch(action)`: 触发一个action，创建state
	-	`subscribe(listener)`
	-	`replaceReducer(nextReducer)`
-	`combineRedecers(reducers)`: 当应用比较复杂的时候，我们可能会分开写好几个reducer，这个函数的作用就是把这些单独的reduce合并为一个大的reduce，需要注意的是我们的state的结构和我们的各个`reducer`是一一对应的
-	`applyMiddleware(...middlewares)`： 告诉redux我们会用到哪些中间件，比如说要用到基础的异步，我们会用到thunk中间件
```
let store = createStore(
	comRedcer,
	applyMiddleware(thunk)
)
```
-	`bindActionCreators()`: 绑定`actionCreator`和`dispatch`以供直接使用






## 为koa框架封装webpack-dev-middleware中间件

### 标准的express中间件

```
expressApp.use((req, res, next) => {
	if (nextNeeded) {
		// do what you want
		// until you need down-stream middleware(s)
		next();
	} else {
		// anything else, e.g. sending response
	}
})
```

### 标准的Koa(v2.x)中间件

```
server.use((context, next) => Promise.resolve(() => doSomething()
	.then(() => {/* before next middleware */})
	.then(() => next())
	.then(() => {/* ... and more */})
	.then(() => {/* after down-stream middleware */})
))
```

???? 为什么使用Promise.resolve()包起来 ????

基于`async`的函数形式
```
koaApp.use(async (context, next) => {
	const beforeNextMiddleware = await doSomething();
	try {
		await next();
	} catch (error) {
		context.body = { message: error.message };
		context.status = error.status || 500;
	}
	return andMore().then(() => evenAfterDownStreams());
})
```

### Koa中间件的基础骨架

定义一个返回Promise的函数或是Async函数都可以直接拿来用作Koa中间件，不过大多数中间件都会需要`options`，所以惯例都会用高阶函数包一层来传参

```
export default (compiler, options) => async (context, next) => {
	await next();
}
```

webpack-dev-middleware需要两个参数：
-	`compiler`：可以通过`webpack(webpackConfig)`获得
-	`options`：补充webpack-dev-middleware需要的特定选项,其中`publicPath`是必须的，并且其值应该等于webpackConfig.output.publicPath

检查`options`是否有效，若不传就用`compiler`里的默认构造一份，有的话沿用。
严格一点的话还可以检查`publicPath`是否正确，否则抛出异常中断处理也可以

```
import webpackDevMiddleware from 'webpack-dev-middleware';

const stats = { chunkModules: false, colors: 'debug' != process.env.NODE_ENV };

export default (compiler, options = {}) => {
	const {publicPath} = compiler.options.output;
	const defaults = options.publicPath ? options : {publicPath, stats};
	const middleware = webpackDevMiddleware(compiler, Object.assign({}, defaults, options));

	return async (context, next) => {
		await next();
	};
}
```













## path.resolve()

path.resolve() - 将路径序列解析成绝对路径，路径被处理的顺序是从右到左，前置每一个子路径的过程

```
path.resolve('/foo', '/bar', 'baz');    // => 'D:\\bar\\baz'
// 路径处理从右到左，'/foo'与'/bar'属于同级
```
如果在处理完所有给定的路径段之后还没有生成绝对路径，就使用当前工作目录路径

-	0长度的路径序列将被忽略
```
path.resolve('');   // => 'D:\\self_project' (当前工作所在路径)
```

-	最后生成的结果是经过整理，并且尾部斜线将被去除的。只有当是根路径时才会有尾部斜杠

```
path.resolve("/");  // => 'D:\\'
```

-	如果抛出TypeError，说明参数不是String类型的

## yarn

安装： 
-	windows下直接下载.msi安装包安装
-	通过Chocolatey安装，需要管理员模式运行PowerShell v3+ 版本
	-	Chocolatey安装命令： `iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex`
	-	禁止脚本运行报错: `set-ExecutionPolicy RemoteSigned`
	-	yarn安装命令: `choco install yarn`


## 参考

> [koa - webpack-dev-middleware](http://www.tuicool.com/articles/MruEni)
> [github上的webpack-dev-middle](https://github.com/yiminghe/koa-webpack-dev-middleware/blob/master/index.js)
> https://webpack.js.org/guides/development/#webpack-dev-middleware
> http://www.jianshu.com/p/0ecd727107bb
> https://github.com/rccoder/blog/issues/18
> [webpack代码分离](https://cnodejs.org/topic/586823335eac96bb04d3e305)
> https://github.com/chikara-chan/react-isomorphic-boilerplate
> [chocolatey](https://chocolatey.org/install)
> [yarn安装](http://www.jianshu.com/p/d2f88722aef9)
> [Express结合Webpack的全栈自动刷新](https://segmentfault.com/a/1190000004505747)
> [koa中webpack热加载&&NODE_ENV配置](https://segmentfault.com/a/1190000004968387)
> [为 Koa 框架封装 webpack-dev-middleware 中间件](https://segmentfault.com/a/1190000004883199)




暂记网站

http://caibaojian.com/mobile-responsive-example.html | 移动前端自适应解决方案和比较-前端开发博客
https://gold.xitu.io/post/589965c9128fe1006569cc9d | Flex 布局应用 - Aitter - 掘金专栏
https://segmentfault.com/a/1190000006178770 | 入门 Webpack，看这篇就够了 - 前端学习笔记 - SegmentFault


https://segmentfault.com/a/1190000004968387 | koa中webpack热加载&&NODE_ENV配置 - zhanfang - SegmentFault
https://segmentfault.com/a/1190000005037309 | 手把手教你基于ES6架构自己的React Boilerplate项目 - 令狐葱@Web前端笔记 - SegmentFault
https://github.com/kentcdodds/cross-env | kentcdodds/cross-env: Cross platform setting of environment scripts

https://segmentfault.com/a/1190000004505747 | Express结合Webpack的全栈自动刷新 - 庭院茶 - SegmentFault
http://stackoverflow.com/questions/37916005/typeerror-webpack2-default-optimize-occurenceorderplugin-is-not-a-function/37916006 | webpack - TypeError: _webpack2.default.optimize.OccurenceOrderPlugin is not a function - Stack Overflow
https://segmentfault.com/a/1190000004883199 | 为 Koa 框架封装 webpack-dev-middleware 中间件 - 太极客（Very Geek） - SegmentFault


https://cnodejs.org/?tab=good | CNode：Node.js专业中文社区
https://jysperm.me/2016/10/nodejs-error-handling/ | Node.js 错误处理实践 | 王子亭的博客
https://cnodejs.org/topic/586823335eac96bb04d3e305 | webpack代码分离 ensure 看了还不懂，你打我 - CNode技术社区

http://www.jianshu.com/p/0ecd727107bb | 教你如何搭建一个超完美的服务端渲染开发环境 - 简书

http://es6.ruanyifeng.com/#docs/promise | Promise 对象 - ECMAScript 6入门
https://github.com/yiminghe/koa-webpack-dev-middleware | yiminghe/koa-webpack-dev-middleware: webpack dev middleware for koa
http://koa.bootcss.com/ | Koa (koajs) -- 基于 Node.js 平台的下一代 web 开发框架 | Koajs 中文文档
