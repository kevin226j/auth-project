import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Import main App Component to render
 */
import {App} from './components/app';

/**
 *  Imported assest from Colorlib template.
 */
import './styles/index.css';
import './assets/vendor/jquery/jquery.min.js';
import './assets/js/main.js';

/**
 * Render main App component, managed by the React DOM.
 */
ReactDOM.render(
    // Inherit class main from assets template.
    <div className="main">
        <App />
    </div>,
    document.getElementById('root')
);
