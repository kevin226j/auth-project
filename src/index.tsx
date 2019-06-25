import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import main App class
import {App} from './app/app';

// Imported assest from Colorlib template.
import './index.css';
import './assets/vendor/jquery/jquery.min.js';
import './assets/js/main.js';

// Render Main App Element, managed by the React DOM.
ReactDOM.render(
    <div className="main">
        <App />
    </div>,
    document.getElementById('root')
);
