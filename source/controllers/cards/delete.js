/**
 * Delete card
 * @param {Object} ctx
 */
const deleteCardController = async(ctx) => {
	const cardId = Number(ctx.params.id);

	await ctx.Cards.del(cardId);
	ctx.status = 200;
};

export default deleteCardController;
