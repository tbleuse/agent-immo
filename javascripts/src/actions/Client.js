import {LOAD_CLIENTS_SUCCESS, CURRENT_CLIENT_CHANGED} from '../constants/Client';

import ClientApi from '../api/Client';

export function loadClients() {
    return function(dispatch) {
        ClientApi.getAllClients().then(clients => {
            dispatch(loadClientsSuccess(clients));
        });
    };
}

export function selectClient(client) {
    return {
        type: CURRENT_CLIENT_CHANGED,
        payload: client
    };
}

function loadClientsSuccess(clients) {
    return {
        type: LOAD_CLIENTS_SUCCESS,
        payload: clients
    };
}

export function saveClient(client) {
    return function(dispatch) {
        ClientApi.createClient(client).then(() => {
            ClientApi.getAllClients().then(clients => {
                dispatch(loadClientsSuccess(clients));
            });
        });
    };
}

export function updateClient(client) {
    return function(dispatch) {
        ClientApi.updateClient(client).then(() => {
            ClientApi.getAllClients().then(clients => {
                dispatch(loadClientsSuccess(clients));
            });
        });
    };
}