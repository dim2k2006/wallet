import React from 'react';
import {hydrate as reactHydrate} from 'react-dom';
import {hydrate as emotionHydrate} from 'emotion';
import App from '../client/components/App';

// eslint-disable-next-line no-underscore-dangle
const {ids, appData} = window.__data;

emotionHydrate(ids);
reactHydrate(<App data={appData} />, document.getElementById('root'));
