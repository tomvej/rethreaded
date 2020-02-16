import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxFreeze from 'redux-freeze';

import reducer from './reducer';

const middlewareList = [];

if (__DEVELOPMENT__) {
    middlewareList.push(reduxFreeze);
}

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewareList)),
);
