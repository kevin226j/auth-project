import * as React from 'react';

const loginImage = require('../../assets/images/signin-image.jpg');

/**
 * Sign Up Component.
 */
export class Login extends React.Component {
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
                                    <input type="text" name="your_name" id="your_name" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass">
                                        <i className="zmdi zmdi-lock" />
                                    </label>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    {/* tslint:disable-next-line: react-a11y-input-elements */}
                                    <input
                                        type="checkbox"
                                        name="remember-me"
                                        id="remember-me"
                                        className="agree-term"
                                        aria-checked="false"
                                    />
                                    <label htmlFor="remember-me" className="label-agree-term">
                                        <span>
                                            <span />
                                        </span>
                                        Remember me
                                    </label>
                                </div>
                                <div className="form-group form-button">
                                    <button
                                        type="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        defaultValue="Log in"
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
