import * as React from 'react';
import {AuthService} from '../services/auth_service';

// function that accepts react components to be authenticated.
export const authGuard = (Component: typeof React.Component) => {
    const auth = new AuthService();

    // Wrapper for guarded components
    return class AuthGuard extends React.Component<{}, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                user: null,
            };
        }

        public componentWillMount() {
            // If user is not logged in redirect to the login page.
            if (!auth.loggedIn()) {
                window.location.replace('/');
            } else {
                try {
                    // Get token from local storage and decode, then set user state.
                    const profile = auth.getProfile();
                    console.log('profile', profile);
                    this.setState({
                        user: profile,
                    });
                } catch (error) {
                    // If there is an error decoding return back to login page.
                    auth.logout();
                    window.location.replace('/');
                }
            }
        }

        public render = () => {
            if (this.state.user) {
                return <Component history={window.history} user={this.state.user} />;
            } else {
                return null;
            }
        };
    };
};
