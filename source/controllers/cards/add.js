import Cards from '../../models/cards';

/**
 * Add card
 * @param req
 * @param res
 */
const AddCardController = (req, res) => {
	const card = req.body;

	card.balance = parseFloat(card.balance);

	try {
		const newCard = Cards.add(card);

		res.status(201).json(newCard);
	} catch (err) {
		res.sendStatus(err.status);
	}
};

export default AddCardController;
