import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {ClientTable} from "./ClientTable";
import ClientForm from "./ClientForm";

import {saveClient} from '../../actions/Client';

import './ClientApp.less';

class ClientApp extends React.Component {

    render() {
        return <div className="client-app">
            <ClientTable clients={this.props.clients}/>
            <ClientForm onSubmit={this.props.saveClient}/>
        </div>;
    }
}

function mapStateToProps(state, ownProps){
    return {
        clients : state.Client.clients
    };
}

function mapDispatchToProps(dispatch){
    return {
        saveClient: bindActionCreators(saveClient, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientApp);
