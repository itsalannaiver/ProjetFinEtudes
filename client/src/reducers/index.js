import { combineReducers } from 'redux';
import authReducer from './authReducer';
import modulesReducer from './modulesReducer';
// Reducer Combiner For Both Display ,Etudiant , auth States

export default combineReducers({
    auth:authReducer,
    modules:modulesReducer
})