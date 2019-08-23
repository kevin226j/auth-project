import * as React from 'react';
import {AuthService, apiService} from '../../services/';
import {authHeader} from '../../utils/';
import {debounce} from '../../helpers/debounce';
import {responseHandler} from '../../helpers/response_handler';
import {IHomeValues} from './interfaces/IHomeValues';
import {Form, Button} from '../form';

/**
 * Home component that includes interface IHomeValues
 */
export class Home extends React.Component<{}, IHomeValues> {
    private authService: AuthService;
    private counter: number;

    constructor(props: any) {
        super(props);

        // Set initial state
        this.state = {
            message: '',
        };

        // Initialize
        this.authService = new AuthService();
        this.counter = 0;

        // Bind methods
        this.logout = this.logout.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    /**
     * Method to bind event from button component to parent when element is clicked.
     * @param e - React.Event
     */
    public onClick() {
        // Use apiService to retrieve response at endpoint.
        this.counter++;
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
    public logout() {
        this.authService.logout();

        // When logged out, return to login page.
        window.location.replace('/');
    }

    /**
     * Render the Home component
     */
    public render() {
        return (
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <Form
                            formClassName="signup-form"
                            className="register-form"
                            id="register-form"
                            title="Home Page"
                        >
                            <Button
                                id="logout"
                                name="logout"
                                label="Logout"
                                // Add debounce method to limit http calls to server when registering
                                onClick={this.logout}
                            />
                            <Button
                                id="test"
                                name="test"
                                label="Test Button"
                                // Add debounce method to limit http calls to server when registering
                                onClick={debounce(this.onClick, 300)}
                            />
                        </Form>
                        <div className="signup-image">
                            <div className="message" id="message">
                                <strong>{this.state.message}</strong>
                                <p> # of Http authenticated test calls: {this.counter} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
