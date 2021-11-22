import React from 'react';
import {Counter} from '../features/counter/Counter';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Counter/>
                <p>
                    Edit <code>src/App.js</code>, save and reload.
                </p>
                <a
                    className="App-link"
                    href="https://datacadamia.com/web/javascript/react/server"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    SSR documentation reference article
                </a>

            </header>
        </div>
    );
}

export default App;
