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
    location.search.includes('clear') ? undefined : JSON.parse(sessionStorage.getItem('state') ?? '{}'),
    composeWithDevTools(applyMiddleware(...middlewareList)),
);

window.addEventListener('unload', () => {
    sessionStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;
