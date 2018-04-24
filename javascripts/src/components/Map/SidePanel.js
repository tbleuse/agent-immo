import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './SidePanel.less';

import {selectClient} from '../../actions/Client';


class SidePanel extends React.Component {
    render() {
        return (
            <div className="side-panel">
                <select onChange={this.props.selectClient}>
                    {this.props.clients.map(client => <option value={client} key={client.id}>{client.firstName + ' ' + client.lastName}</option>)}
                </select>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        clients: state.Client.clients,
        currentClient: state.Client.currentClient
    };
}

function mapDispatchToProps(dispatch){
    return {
        selectClient: bindActionCreators(selectClient, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
