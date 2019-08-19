import * as React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {SignUp} from './auth/signup';
import {Login} from './auth/login';
import {Home} from './home/home';

import {authGuard as AuthGuard} from '../utils/auth_guard';

export const router: React.StatelessComponent = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route exact={true} path="/signup" component={SignUp} />
                <Route exact={true} path="/home" component={AuthGuard(Home)} />
                <Route exact={true} path="/*" component={() => <div> Not Found</div>} />
            </Switch>
        </React.Fragment>
    );
};
