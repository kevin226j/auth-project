import * as React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {Register} from './auth/register';
import {Login} from './auth/login';
import {Home} from './home/home';
import {authGuard as AuthGuard} from '../utils/auth_guard';

/**
 * Router component that enables routing for app.
 */
export const router: React.StatelessComponent = () => {
    return (
        <React.Fragment>
            <Switch>
                {/* Non-Protected routes */}
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/register" component={Register} />

                {/* Protected routes */}
                <Route exact={true} path="/home" component={AuthGuard(Home)} />

                {/* Error routes */}
                <Route exact={true} path="/*" component={() => <div> Not Found</div>} />
            </Switch>
        </React.Fragment>
    );
};
