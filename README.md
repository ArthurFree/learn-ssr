-	nodemon ?
-	cross-env NODE_ENV ?

-	node
	-	__dirname： 获取当前文件所在目录的完整目录名
	-	__filename： 获取当前模块文件的带有完整绝对路径的文件名

-	webpack
	-	context： 设置基础目录，一个绝对路径
	-	entry: vendor： 将项目中的相互独立，互不依赖的外部引用打包在一起，通过CommonChunkPlugin
	-	devtool： 增强调试过程，一般选择`cheap-source-map`

-	webpack-dev-middleware - 使用中间件的方式，对于已有node服务或者希望完全控制服务器很有用
	-	中间件会使webpack的编译过程在内存中进行, 编译执行时会延迟请求直到编译完成













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


## 参考

> [koa - webpack-dev-middleware](http://www.tuicool.com/articles/MruEni)
https://github.com/yiminghe/koa-webpack-dev-middleware/blob/master/index.js
https://webpack.js.org/guides/development/#webpack-dev-middleware
http://www.jianshu.com/p/0ecd727107bb
https://github.com/rccoder/blog/issues/18
https://cnodejs.org/topic/586823335eac96bb04d3e305
https://github.com/chikara-chan/react-isomorphic-boilerplate