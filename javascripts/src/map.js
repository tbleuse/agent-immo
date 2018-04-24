import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './stores';

import {loadMapHouses} from './actions/Map';
import {loadClients, selectClient} from './actions/Client';

import MapApp from './components/Map/MapApp';

const store = configureStore();

store.dispatch(loadClients());
store.dispatch(loadMapHouses());

ReactDOM.render(
    <Provider store={store}>
        <MapApp />
    </Provider>, document.getElementById('content'));

registerServiceWorker();