import {LOAD_HOUSES_SUCCESS} from '../../constants/House';

import initialState from "./initialState"

function house(
    state = initialState,
    { payload, type }
) {
    switch (type) {
        case LOAD_HOUSES_SUCCESS:
            return {...state,
                houses: payload,
            };
        default:
            return state;
    }
}

export default house;