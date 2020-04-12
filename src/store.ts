import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxFreeze from 'redux-freeze';

import reducer from './reducer';

const middlewareList = [];

if (__DEVELOPMENT__) {
    middlewareList.push(reduxFreeze);
}

const store = createStore(
    reducer,
    location.search.includes('clear') ? undefined : JSON.parse(localStorage.getItem('rethreaded') ?? '{}'),
    composeWithDevTools(applyMiddleware(...middlewareList)),
);

window.addEventListener('unload', () => {
    localStorage.setItem('rethreaded', JSON.stringify(store.getState()));
});

export default store;
