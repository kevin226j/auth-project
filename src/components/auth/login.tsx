import * as React from 'react';
import {AuthService} from '../../services/auth_service';

const loginImage = require('../../assets/images/signin-image.jpg');

interface ILogin {
    username: string;
    password: string;
}

/**
 * Sign Up Component.
 */
export class Login extends React.Component<{}, ILogin> {
    private authService: AuthService;

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.authService = new AuthService();
    }

    public handleChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        });
        console.log(this.state);
    };

    public onSubmit = (e: any): void => {
        e.preventDefault();
        console.log(this.state);

        const payload = {
            email: this.state.username,
            password: this.state.password,
        };

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

    componentWillMount = () => {
        if (this.authService.loggedIn()) {
            // If user is already logged in, send them to home page.
            window.location.replace('/home');
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
                                <div className="form-group">
                                    <label htmlFor="your_name">
                                        <i className="zmdi zmdi-account material-icons-name" />
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="username"
                                        placeholder="Username"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock" />
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="password"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                </div>
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
                                    <li>
                                        <a href="/facebooklogin">
                                            <i className="display-flex-center zmdi zmdi-facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        {/* tslint:disable-next-line: react-a11y-anchors */}
                                        <a href="twitterlogin">
                                            <i className="display-flex-center zmdi zmdi-twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        {/* tslint:disable-next-line: react-a11y-anchors */}
                                        <a href="/googlelogin">
                                            <i className="display-flex-center zmdi zmdi-google" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
