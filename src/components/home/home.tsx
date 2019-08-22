import * as React from 'react';
import {AuthService, apiService} from '../../services/';
import {authHeader} from '../../utils/';
import {debounce} from '../../helpers/debounce';
import {responseHandler} from '../../helpers/response_handler';
import {IHomeValues} from './interfaces/IHomeValues';

/**
 * Home component that includes interface IHomeValues
 */
export class Home extends React.Component<{}, IHomeValues> {
    private authService: AuthService;

    constructor(props: any) {
        super(props);

        // Set initial state
        this.state = {
            message: '',
        };

        // Initialize
        this.authService = new AuthService();

        // Bind methods
        this.logout = this.logout.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    /**
     * Method to bind event from button component to parent when element is clicked.
     * @param e - React.Event
     */
    public onClick(e: any) {
        // Use apiService to retrieve response at endpoint.
        apiService('api/users/test', 'get', null, authHeader())
            // Handle response using helper
            .then(res => responseHandler(res))
            // Handle response.
            .then(res => {
                this.setState({
                    message: res.message,
                });
            });
    }

    /**
     * Method to logout user using authService
     * @param e - React.Event
     */
    public logout(e: any) {
        e.preventDefault();
        this.authService.logout();

        // When logged out, return to login page.
        window.location.replace('/');
    }

    /**
     * Render the Home component
     */
    public render() {
        return (
            <div>
                <div className="form-group form-button">
                    <button
                        type="submit"
                        name="signin"
                        id="signin"
                        className="form-submit"
                        defaultValue="Log in"
                        onClick={this.logout}
                    >
                        Logout
                    </button>
                    <button
                        type="submit"
                        name="test"
                        id="test"
                        className="form-submit"
                        defaultValue="test"
                        onClick={debounce(this.onClick, 300)}
                    >
                        Test Auth Header
                    </button>
                    <div>
                        <strong>{this.state.message}</strong>
                    </div>
                </div>
            </div>
        );
    }
}
