import Express from 'express'
import React from 'react'
import {Provider} from 'react-redux'
import App from './containers/App'
import * as ReactDOMServer from "react-dom/server";
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./redux/reducers";

const app = Express()

const port = process.argv[2] || 3000;


//Serve static files
// the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory,
// it’s safer to use the absolute path of the directory that you want to serve:
const path = require('path')
app.use('/static', Express.static(path.join(__dirname, '../dist')))

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {

    /**
     * Creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.
     */
    let store = configureStore({
        reducer: reducers,
    });

    // Render the component to a string
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
}


function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
    )}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)