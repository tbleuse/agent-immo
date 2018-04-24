import {combineReducers} from 'redux'
import Client from './Client/index';
import House from './House/index';
import { reducer as reduxFormReducer } from 'redux-form';

const moduleReducers = combineReducers({
    Client,
    House,
    form: reduxFormReducer
});

export default moduleReducers