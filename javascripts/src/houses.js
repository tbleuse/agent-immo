import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import HouseApp from "./components/House/HouseApp";
import registerServiceWorker from './registerServiceWorker';
import configureStore from './stores';

import {loadHouses} from './actions/House';

const store = configureStore();

store.dispatch(loadHouses());

ReactDOM.render(
    <Provider store={store}>
        <HouseApp />
    </Provider>, document.getElementById('content'));

registerServiceWorker();