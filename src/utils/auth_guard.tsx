import * as React from 'react';
import {AuthService} from '../services/auth_service';

/**
 * HOC function that accepts React components to be authenticated.
 * @param Component - React Based component
 */
export const authGuard = (Component: typeof React.Component) => {
    const auth = new AuthService();

    /**
     * Wrapper class for guarded components
     */
    return class AuthGuard extends React.Component<{}, any> {
        constructor(props: any) {
            super(props);

            // Initial states
            this.state = {
                user: null,
            };
        }

        /**
         * Lifecycle hook. Before component mounts, check to see if user is already logged in or not.
         */
        public componentWillMount() {
            // If user is not logged in redirect to the login page.
            if (!auth.loggedIn()) {
                window.location.replace('/');
            } else {
                try {
                    // Get token from local storage and decode, then set user state.
                    const profile = auth.getProfile();
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

        /**
         * Render component that has been authenticated/logged in.
         */
        public render = () => {
            if (this.state.user) {
                return <Component history={window.history} user={this.state.user} />;
            } else {
                return null;
            }
        };
    };
};
