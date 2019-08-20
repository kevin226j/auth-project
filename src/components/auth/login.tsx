import * as React from 'react';
import {AuthService} from '../../services/auth_service';
import {debounce} from '../../helpers/debounce';
import {ILogin} from '../../interfaces';
import {Input} from '../form/input';

const loginImage = require('../../assets/images/signin-image.jpg');

interface ILoginError {
    username: string;
    password: string;
}

/**
 * Sign Up Component.
 */
export class Login extends React.Component<{}, ILogin> {
    private authService: AuthService;
    private socialLoginIcons: string[];
    private loginError: ILoginError;

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.loginError = {username: '', password: ''};
        this.socialLoginIcons = ['google', 'twitter', 'facebook'];
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.authService = new AuthService();
    }

    /**
     * @param fieldName
     * @param fieldValue
     */
    public onChange = (fieldName: string, fieldValue: any) => {
        const nextState = {
            ...this.state,
            [fieldName]: fieldValue,
        };
        this.setState(nextState, () => console.log(this.state));

        switch (fieldName) {
            case 'username':
                if (fieldValue.length < 3) {
                    this.loginError.username = 'Username must have a length of 3.';
                } else {
                    this.loginError.username = '';
                }
                break;
            case 'password':
                if (fieldValue.length < 3) {
                    this.loginError.password = 'Password must have a length of 3.';
                } else {
                    this.loginError.password = '';
                }
                break;
        }
    };

    /**
     * @param e
     */
    public onSubmit = (e: any): void => {
        e.preventDefault();

        // Make API call to server after validation is complete.
        this.authService
            .login(this.state.username, this.state.password)
            .then((res: any) => {
                window.location.replace('/home');
            })
            .catch((err: any) => {
                console.log(err);
                alert('Invalid Credentials, please try again');
                window.location.reload();
            });
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
                            <a href="/signup" className="signup-image-link">
                                Create an account
                            </a>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <form method="POST" className="register-form" id="login-form">
                                {/* Test Input component */}
                                <Input
                                    name="username"
                                    type="text"
                                    className="username"
                                    icon="zmdi zmdi-account material-icons-name"
                                    placeHolder="Username"
                                    label="Username"
                                    onChange={this.onChange}
                                    error={this.loginError.username}
                                />
                                <Input
                                    name="password"
                                    type="password"
                                    className="password"
                                    icon="zmdi zmdi-lock"
                                    placeHolder="Password"
                                    label="Password"
                                    onChange={this.onChange}
                                    error={this.loginError.password}
                                />

                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        defaultValue="Log in"
                                        onClick={this.onSubmit}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
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
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
