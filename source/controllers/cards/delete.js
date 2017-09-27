import Cards from '../../models/cards';

/**
 * Delete card
 * @param req
 * @param res
 */
const deleteCardController = (req, res) => {
	const cardId = Number(req.params.id);

	try {
		Cards.del(cardId);

		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(err.status);
	}
};

export default deleteCardController;
