import React from 'react';
import moment from 'moment';


import './HouseRow.less';


export class HouseRow extends React.Component {

    makeAddress() {
        return this.props.house.address + ' ' + this.props.house.postCode + ' ' + this.props.house.town;
    }

    render() {
        return <tr className="house-row">
            <td>
                {this.makeAddress()}
            </td>
            <td>
                {moment(this.props.house.toSellSince).format('DD/MM/YYYY')}
            </td>
            <td>
                {this.props.house.price}
            </td>
            <td>

            </td>
        </tr>;
    }
}