import * as React from 'react';
import {Input} from '../form/input';
import {apiService} from '../../services/api_service';
import {AuthService} from '../../services/auth_service';
import {responseHandler} from '../../helpers/response_handler';
import {CheckBox} from '../form/checkbox';
import {Button} from '../form/button';
import {Form} from '../form/form';
import {required, isEmail, minLength, matchPasswords} from '../../validators';

const registerImage = require('../../assets/images/signup-image.jpg');

interface IRegisterInputValues {
    name: string;
    email: string;
    isChecked: boolean;
    password: string;
    confirmPassword: string;
}

interface IError {
    [key: string]: string;
}

interface ISignUpState {
    values: IRegisterInputValues;
    errors: IError;
}

/**
 * Sign Up Component.
 */
export class Register extends React.Component<{}, ISignUpState> {
    private authService: AuthService;

    constructor(props: any) {
        super(props);
        this.state = {
            values: {
                name: '',
                email: '',
                isChecked: false,
                password: '',
                confirmPassword: '',
            },
            errors: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.authService = new AuthService();
    }

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

    public onCheck = (fieldValue: boolean) => {
        console.log('is checked clicked');
        const nextState = {
            values: {
                ...this.state.values,
                isChecked: fieldValue,
            },
        };
        this.setState(nextState);
    };

    public validate = (fieldName: string, fieldValue: string) => {
        console.log(fieldName, fieldValue);
        switch (fieldName) {
            case 'name':
                this.state.errors.name = !required(fieldValue) ? 'Field Required' : '';
                break;
            case 'email':
                this.state.errors.email = !required(fieldValue)
                    ? 'Field Required.'
                    : !isEmail(fieldValue)
                    ? 'Must be a valid email.'
                    : '';
                break;
            case 'password':
                this.state.errors.password = !required(fieldValue)
                    ? 'Field Required.'
                    : !minLength(fieldValue, 5)
                    ? 'Must be at least 5 charachters long.'
                    : '';
                break;
            case 'confirmPassword':
                this.state.errors.confirmPassword = !required(fieldValue)
                    ? 'Field Required.'
                    : !matchPasswords(this.state.values.password, fieldValue)
                    ? 'Paswords must match.'
                    : '';
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

    public onSubmit = () => {
        console.log(this.state);
        console.log(this.isFormValid());

        if (this.isFormValid()) {
            if (!this.state.values.isChecked) {
                alert('Must agree before registering.');
            } else {
                const {name, email, password} = this.state.values;
                const payload = {
                    name,
                    email,
                    password,
                };
                apiService('api/users/register', 'post', payload)
                    .then(responseHandler)
                    .then((res: any) => {
                        console.log(res);
                        this.authService.setToken(res.token);
                        window.location.replace('/home');
                    });
            }
        } else {
            // Validate fields if Form is not valid.
            for (let [state, val] of Object.entries(this.state.values)) {
                this.validate(state, val);
            }
            this.setState(prevState => ({...prevState}));
        }
    };

    public componentWillMount() {
        if (this.authService.loggedIn()) {
            // If user is already logged in, send them to home page.
            window.location.replace('/home');
        } else {
            this.authService.logout();
        }
    }

    public render() {
        return (
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <Form formClassName="signup-form" className="register-form" id="register-form" title="Sign Up">
                            <Input
                                name="name"
                                type="text"
                                className="name"
                                icon="zmdi zmdi-account material-icons-name"
                                placeHolder="Your Name"
                                label="name"
                                onChange={this.onChange}
                                error={this.state.errors.name}
                            />
                            <Input
                                name="email"
                                type="text"
                                className="email"
                                icon="zmdi zmdi-email"
                                placeHolder="Your Email"
                                label="email"
                                onChange={this.onChange}
                                error={this.state.errors.email}
                            />
                            <Input
                                name="password"
                                type="password"
                                className="password"
                                icon="zmdi zmdi-lock"
                                placeHolder="Password"
                                label="password"
                                onChange={this.onChange}
                                error={this.state.errors.password}
                            />
                            <Input
                                name="confirmPassword"
                                type="password"
                                className="confirmPassword"
                                icon="zmdi zmdi-lock-outline"
                                placeHolder="Confirm Password"
                                label="confirmPassword"
                                onChange={this.onChange}
                                error={this.state.errors.confirmPassword}
                            />

                            <CheckBox
                                id="isChecked"
                                name="isChecked"
                                checked={this.state.values.isChecked}
                                onCheck={this.onCheck}
                                label={['I agree all statements in ', <u key={0}>Terms of service</u>]}
                            />

                            <Button
                                disabled={!this.isFormValid()}
                                id="signup"
                                name="signup"
                                label="Register"
                                onClick={this.onSubmit}
                            />
                        </Form>
                        <div className="signup-image">
                            <figure>
                                <img src={String(registerImage)} alt="sing up image" />
                            </figure>
                            <a href="/" className="signup-image-link">
                                I am already member
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
