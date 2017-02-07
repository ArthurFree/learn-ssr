import devMiddleware from 'webpack-dev-middleware';

export default (compiler, opts) => {
	const expressMiddle = devMiddleware(compiler, opts);

	return async (ctx, next) => {
		await expressMiddleware(ctx.req, {}, next)
	}
}