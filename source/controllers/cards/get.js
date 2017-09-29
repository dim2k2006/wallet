/**
 * Get all cards
 * @param {Object} ctx
 */
const getCardsController = async(ctx) => {
	ctx.body = await ctx.CardsModel.getAll();
};

export default getCardsController;
