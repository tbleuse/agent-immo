import {LOAD_HOUSES_SUCCESS} from '../constants/House';

import HouseApi from '../api/House';

export function loadHouses() {
    return function(dispatch) {
        HouseApi.getAllHouses().then(houses => {
            dispatch(loadHousesSuccess(houses));
        });
    };
}



export function loadHousesSuccess(houses) {
    return {
        type: LOAD_HOUSES_SUCCESS,
        payload: houses
    };
}

export function saveHouse(house) {
    return function(dispatch) {
        HouseApi.createHouse(house).then(() => {
            HouseApi.getAllHouses().then(houses => {
                dispatch(loadHousesSuccess(houses));
            });
        });
    };
}