-	???? nodemon ????
-	???? cross-env NODE_ENV ????

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
	-	devtool： 增强调试过程，一般选择`cheap-source-map`
	- 	cache： 缓存已生成webpack模块，提高打包速度(Cache the generated webpack modules and chunks to improve build speed)

-	webpack-dev-middleware - 使用中间件的方式，对于已有node服务或者希望完全控制服务器很有用
	-	中间件会使webpack的编译过程在内存中进行, 编译执行时会延迟请求直到编译完成
	-	使用koa框架构建web应用需要重新封装一下webpack-dev-middleware



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