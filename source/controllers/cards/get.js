import Cards from '../../models/cards';

/**
 * Get all cards
 * @param req
 * @param res
 */
const getCardsController = (req, res) => {
	res.json(Cards.get());
};

export default getCardsController;
