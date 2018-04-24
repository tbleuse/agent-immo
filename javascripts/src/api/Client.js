const host = 'http://localhost:9000/';

export default class ClientApi {

    static getAllClients() {
        return fetch(host + 'api/clients').then(response => response.json());
    }

    static createClient(client) {
        return fetch(host + 'api/clients',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            }).then(response => response.json())
    }

    static updateClient(client) {
        client.interestZones = JSON.stringify(client.interestZones);
        return fetch(host + 'api/clients/' + client.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            }).then(response => response.json())
    }

    static createSearchZone(zone) {
        return fetch(host + 'api/clients/zones',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(zone)
            }).then(response => response.json())
    }

    static getZones(client) {
        return fetch(host + 'api/clients/zones').then(response => response.json());
    }
}