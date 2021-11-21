import React from 'react'
import {hydrate} from 'react-dom'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux'
import App from './containers/App'
import reducers from "./redux/reducers";
import "regenerator-runtime/runtime.js";


// Create Redux store with state injected in the HTML page
// on the server side via a script node
const store = configureStore({
    reducer: reducers,
    preloadedState: window.__PRELOADED_STATE__
});

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__


hydrate(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
