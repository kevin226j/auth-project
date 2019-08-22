import * as React from 'react';
import {AuthService} from '../../services/auth_service';
import {debounce} from '../../helpers/debounce';
import {ILogin} from '../../interfaces';
import {Input} from '../form/input';
import {required, maxLength, isEmail, minLength} from '../../validators';
import useForm from 'react-hook-form';
import SimpleReactValidator from 'simple-react-validator';
import {Form} from '../form/form';
import {Button} from '../form/button';

const loginImage = require('../../assets/images/signin-image.jpg');

interface IError {
    [key: string]: string;
}

interface ILoginValues {
    username: string;
    password: string;
}

interface ILoginState {
    values: ILoginValues;
    errors: IError;
}
/**
 * Sign Up Component.
 */
export class Login extends React.Component<{}, ILoginState> {
    private authService: AuthService;
    private socialLoginIcons: string[];

    constructor(props: any) {
        super(props);
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
        this.socialLoginIcons = ['google', 'twitter', 'facebook'];
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.authService = new AuthService();
    }

    /**
     * @param fieldName
     * @param fieldValue
     */
    public onChange = (fieldName: string, fieldValue: string) => {
        const nextState = {
            ...this.state,
            values: {
                ...this.state.values,
                [fieldName]: fieldValue,
            },
        };

        this.validate(fieldName, fieldValue);
        this.setState(nextState);
    };

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
     * @param e
     */
    public onSubmit = (): void => {
        console.log(this.state);

        if (this.isFormValid()) {
            // Make API call to server after validation is complete.
            this.authService
                .login(this.state.values.username, this.state.values.password)
                .then((_res: any) => {
                    window.location.replace('/home');
                })
                .catch((err: any) => {
                    console.log(err);
                    alert('Invalid Credentials, please try again');
                    window.location.reload();
                });
        } else {
            // Validate fields if Form is not valid.
            for (let [state, val] of Object.entries(this.state.values)) {
                this.validate(state, val);
            }
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
