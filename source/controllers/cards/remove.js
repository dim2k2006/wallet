/**
 * Remove card
 * @param {Object} ctx
 */
const removeCardController = async(ctx) => {
	const cardId = Number(ctx.params.id);

	await ctx.CardsModel.remove(cardId);
	ctx.status = 200;
};

export default removeCardController;
