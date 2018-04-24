import React from 'react';
import moment from 'moment';


import './ClientRow.less';


export class ClientRow extends React.Component {
    render() {
        return <tr className="client-row">
            <td>
                {this.props.client.firstName + ' ' + this.props.client.lastName}
            </td>
            <td>
                {moment(this.props.client.searchSince).format('DD/MM/YYYY')}
            </td>
            <td>
                {this.props.client.maxPrice}
            </td>
            <td>

            </td>
        </tr>;
    }
}