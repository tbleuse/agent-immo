import {LOAD_CLIENTS_SUCCESS, CURRENT_CLIENT_CHANGED} from '../../constants/Client';

import initialState from "./initialState"

function client(
    state = initialState,
    { payload, type }
) {
    switch (type) {
        case LOAD_CLIENTS_SUCCESS:
            debugger;
            return {...state,
                clients: payload,
                currentClient: Object.keys(state.currentClient).length > 0 ? state.currentClient : payload.length > 0 ? payload[0] : {}
            };
        case CURRENT_CLIENT_CHANGED:
            return {
                ...state,
                currentClient: payload
            };
        default:
            return state;
    }
}

export default client;