import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ClientApp from "./components/Client/ClientApp";
import registerServiceWorker from './registerServiceWorker';
import configureStore from './stores';

import {loadClients} from './actions/Client';

const store = configureStore();

store.dispatch(loadClients());

ReactDOM.render(
    <Provider store={store}>
        <ClientApp />
    </Provider>, document.getElementById('content'));

registerServiceWorker();