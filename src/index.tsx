import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import main App class
import {App} from './components/app';

/**
 *  Imported assest from Colorlib template.
 */
// Styles import from styles.
import './styles/index.css';

// JQuery minified Library.
import './assets/vendor/jquery/jquery.min.js';

// Colorlib template main js.
import './assets/js/main.js';

// Render Main App Element, managed by the React DOM.
ReactDOM.render(
    <div className="main">
        <App />
    </div>,
    document.getElementById('root')
);
