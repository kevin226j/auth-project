import * as React from 'react';
import {BrowserRouter as ReactDOMRouter} from 'react-router-dom';
import {router as Router} from './router';

/**
 * Main React App component that renders Router component.
 */
export class App extends React.Component {
    public render() {
        return (
            <ReactDOMRouter>
                <Router />
            </ReactDOMRouter>
        );
    }
}
