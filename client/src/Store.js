import {createStore, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// The Main Redux Store For The Whole App

const initialState={};
// Thunk for async Actions
const middleware=[thunk];

const store=createStore(rootReducer , initialState , compose(applyMiddleware(...middleware)))

export default store;