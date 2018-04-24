import React from 'react';
import {connect} from 'react-redux';



import {saveClient} from '../../actions/Map';

import Map from './Map.js';

import './MapApp.less';
import SidePanel from "./SidePanel";

class App extends React.Component {

    render() {
        return <div className="map-app">
            <SidePanel />
            <Map />
        </div>;
    }
}

function mapStateToProps(state, ownProps){
    return {
        clients: state.Client.clients
    };
}

function mapDispatchToProps(dispatch){
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
