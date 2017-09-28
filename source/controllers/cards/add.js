/**
 * Add card
 * @param {Object} ctx
 */
const AddCardController = async(ctx) => {
	const card = ctx.request.body;
	const newCard = await ctx.Cards.add(card);

	ctx.status = 201;
	ctx.body = newCard;
};

export default AddCardController;
