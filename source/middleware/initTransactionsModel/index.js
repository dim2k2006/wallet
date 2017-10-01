import TransactionsModel from '../../models/transactions';

export default async (ctx, next) => {
	ctx.TransactionsModel = new TransactionsModel();
	await ctx.TransactionsModel.loadFile();
	await next();
};
