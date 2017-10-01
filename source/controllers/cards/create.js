/**
 * Create new card
 * @param {Object} ctx
 */
const createCardController = async (ctx) => {
	const card = ctx.request.body;
	const newCard = await ctx.CardsModel.create(card);

	ctx.status = 201;
	ctx.body = newCard;
};

export default createCardController;
