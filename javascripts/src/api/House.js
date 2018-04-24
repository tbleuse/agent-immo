const host = 'http://localhost:9000/';

import {MAPBOX_API_TOKEN} from './keys';

export default class HouseApi {

    static getAllHouses() {
        return fetch(host + 'api/houses').then(response => response.json());
    }

    static createHouse(house) {
        return fetch(host + 'api/houses',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(house)
            }).then(response => response.json())
    }

    static getGeoCode(house) {
        const address = house.address + ' ' + house.postCode + ' ' + house.town + ' France';
        return fetch('https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/'
            + encodeURIComponent(address)
            + '.json?access_token=' + MAPBOX_API_TOKEN).then(response => response.json());
    }
}