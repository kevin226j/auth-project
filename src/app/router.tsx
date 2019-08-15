import * as React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {SignUp} from './components/signup';
import {Login} from './components/login';

export const router: React.StatelessComponent = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/*" component={() => <div> Not Found</div>} />
            </Switch>
        </React.Fragment>
    );
};
