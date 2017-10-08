import index from '../../public/js/index.server';

const views = {
	index
};

const getView = (viewId) => {
	// eslint-disable-next-line no-prototype-builtins
	if (views.hasOwnProperty(viewId)) {
		return views[viewId];
	}

	return false;
};

export default getView;
