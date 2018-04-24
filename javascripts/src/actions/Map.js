import HouseApi from '../api/House';
import ClientApi from '../api/Client';

import {loadHousesSuccess} from './House';

export function loadMapHouses() {
    return function(dispatch) {
        HouseApi.getAllHouses().then(houses => {
            Promise.all(houses.map(house => HouseApi.getGeoCode(house))).then(result => {
                for (let i = 0; i < result.length; i++) {
                    const feature = result[i].features.reduce((a, b) => a.relevance > b.relevance ? a : b, result[i].features[0]);
                    houses[i].longitude = feature.geometry.coordinates[0];
                    houses[i].latitude = feature.geometry.coordinates[1];
                }
                dispatch(loadHousesSuccess(houses));
            })
        });
    };
}

export function createSearchZone(client, zone) {
    return function(dispatch) {
        client.zones.push(zone);
        ClientApi.createSearchZone(zone).then(result => {
        });
    };
}
