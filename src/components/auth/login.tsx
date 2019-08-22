import * as React from 'react';
import {AuthService} from '../../services/auth_service';
import {ILogin, IError} from './interfaces';
import {Input, Form, Button} from '../form';
import {required, isEmail} from '../../utils/validators';
import {responseHandler} from '../../helpers/response_handler';

/**
 * Load image from assets
 */
const loginImage = require('../../assets/images/signin-image.jpg');

/**
 * Interface for state of Login Component.
 */
interface ILoginState {
    values: ILogin;
    errors: IError;
}

/**
 * Login Component. Class/State component.
 */
export class Login extends React.Component<{}, ILoginState> {
    private authService: AuthService;
    private socialLoginIcons: string[];

    constructor(props: any) {
        super(props);

        // Set initial state
        this.state = {
            values: {
                username: '',
                password: '',
            },
            errors: {
                username: '',
                password: '',
            },
        };

        // Initialize
        this.socialLoginIcons = ['google', 'twitter', 'facebook'];
        this.authService = new AuthService();

        // Bind methods
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Method to bind event from Input component to parent when element is being typed.
     * @param fieldName - element name
     * @param fieldValue - element value
     */
    public onChange = (fieldName: string, fieldValue: string) => {
        // Set next state
        const nextState = {
            ...this.state,
            values: {
                ...this.state.values,
                [fieldName]: fieldValue,
            },
        };

        // Validate as user is typing in input fields.
        this.validate(fieldName, fieldValue);

        this.setState(nextState);
    };

    /**
     * Validate input based on element name. Basic validation.
     * @param fieldName - element name
     * @param fieldValue - element value
     */
    public validate = (fieldName: string, fieldValue: string) => {
        switch (fieldName) {
            case 'username':
                this.state.errors.username = !required(fieldValue)
                    ? 'Field Required.'
                    : !isEmail(fieldValue)
                    ? 'Must be a valid email.'
                    : '';
                break;
            case 'password':
                this.state.errors.password = !required(fieldValue) ? 'Field Required' : '';
                break;
        }
    };

    /**
     * Method to check if form inputs are valid. Will check for any error messages and make sure no fields are empty.
     * @returns boolean
     */
    private isFormValid = (): boolean => {
        let isValid = true;

        // Check state values, make sure there are no empty fields
        Object.values(this.state.values).forEach(value => {
            if (value.length === 0) isValid = false;
        });

        // Check error values, make sure there are no error messages.
        Object.values(this.state.errors).forEach(error => {
            if (error.length !== 0) isValid = false;
        });

        return isValid;
    };

    /**
     * Method that submits form.
     */
    public onSubmit = (): void => {
        if (this.isFormValid()) {
            // Make API call to server after validation is complete.
            this.authService
                .login(this.state.values.username, this.state.values.password)
                // Filter response.
                .then(res => responseHandler(res))

                //Handle response.
                .then((_res: any) => {
                    // Redirect user to Homepage
                    window.location.replace('/home');
                })
                .catch((err: any) => {
                    alert('Invalid Credentials, please try again');

                    // reload current Login page if login is unsucceessful
                    window.location.reload();
                });
        } else {
            // Validate fields if current form is not valid.
            for (let [state, val] of Object.entries(this.state.values)) {
                this.validate(state, val);
            }

            // Invoke state to display error messages.
            this.setState(prevState => ({...prevState}));
        }
    };

    /**
     * Component will mount lifecycle to check and redirect if user is logged in.
     */
    public componentWillMount = () => {
        if (this.authService.loggedIn()) {
            // If user is already logged in, send them to home page.
            window.location.replace('/home');
        } else {
            this.authService.logout();
        }
    };

    public render() {
        return (
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={String(loginImage)} alt="sing up image" />
                            </figure>
                            <a href="/register" className="signup-image-link">
                                Create an account
                            </a>
                        </div>
                        <Form title="Sign In" formClassName="signin-form" className="register-form" id="login-form">
                            <Input
                                name="username"
                                type="text"
                                className="username"
                                icon="zmdi zmdi-account material-icons-name"
                                placeHolder="Username"
                                label="Username"
                                onChange={this.onChange}
                                error={this.state.errors.username}
                            />
                            <Input
                                name="password"
                                type="password"
                                className="password"
                                icon="zmdi zmdi-lock"
                                placeHolder="Password"
                                label="Password"
                                onChange={this.onChange}
                                error={this.state.errors.password}
                            />
                            <Button
                                disabled={!this.isFormValid()}
                                id="signin"
                                name="signin"
                                onClick={this.onSubmit}
                                label="Login"
                            />

                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    {this.socialLoginIcons.map((icon, index) => {
                                        return (
                                            <li key={index}>
                                                <a href={`/${icon}/login`}>
                                                    <i className={`display-flex-center zmdi zmdi-${icon}`} />
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        );
    }
}
