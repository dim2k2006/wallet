import CardsModel from '../../models/cards';

export default async (ctx, next) => {
	ctx.CardsModel = new CardsModel();
	await ctx.CardsModel.loadFile();
	await next();
};
