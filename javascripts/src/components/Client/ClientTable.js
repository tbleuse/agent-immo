import React from 'react';

import {ClientRow} from "./ClientRow";

import './ClientTable.less';

export class ClientTable extends React.Component {
    render() {
        return <table className="table client-table">
            <thead>
                <tr>
                    <th>
                        Nom
                    </th>
                    <th>
                        En recherche depuis
                    </th>
                    <th>
                        Budget
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.props.clients.map(client => <ClientRow key={client.id} client={client}/>)}
            </tbody>
        </table>;
    }
}