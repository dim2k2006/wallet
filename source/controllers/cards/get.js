/**
 * Get all cards
 * @param {Object} ctx
 */
const getCardsController = async(ctx) => {
	ctx.body = await ctx.Cards.get();
};

export default getCardsController;
