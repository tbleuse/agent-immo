import React from 'react';

import {HouseRow} from "./HouseRow";

import './HouseTable.less';

export class HouseTable extends React.Component {
    render() {
        return <table className="table house-table">
            <thead>
                <tr>
                    <th>
                        Adresse
                    </th>
                    <th>
                        A vendre depuis
                    </th>
                    <th>
                        Prix
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.props.houses.map(house => <HouseRow key={house.id} house={house}/>)}
            </tbody>
        </table>;
    }
}