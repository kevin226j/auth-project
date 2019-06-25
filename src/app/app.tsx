import * as React from 'react';
import {BrowserRouter as ReactDOMRouter} from 'react-router-dom';

import {router as Router} from './router';

/**
 * App Class.
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
