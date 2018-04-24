import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {HouseTable} from "./HouseTable";
import HouseForm from "./HouseForm";

import {saveHouse} from '../../actions/House';

import './HouseApp.less';

class App extends React.Component {

    render() {
        return <div className="house-app">
            <HouseTable houses={this.props.houses}/>
            <HouseForm onSubmit={this.props.saveHouse}/>
        </div>;
    }
}

function mapStateToProps(state, ownProps){
    return {
        houses : state.House.houses
    };
}

function mapDispatchToProps(dispatch){
    return {
        saveHouse: bindActionCreators(saveHouse, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
