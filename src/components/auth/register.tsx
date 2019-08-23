import * as React from 'react';
import {apiService, AuthService} from '../../services/';
import {responseHandler} from '../../helpers/response_handler';
import {CheckBox, Button, Form, Input} from '../form/';
import {required, isEmail, minLength, matchPasswords} from '../../utils/validators';
import {IRegister, IError} from './interfaces';
import {debounce} from '../../helpers/debounce';

/**
 * Load image from assets
 */
const registerImage = require('../../assets/images/signup-image.jpg');

/**
 * Interface for state of Register Component.
 */
interface ISignUpState {
    values: IRegister;
    errors: IError;
}

/**
 * Register Component. Class/State component.
 */
export class Register extends React.Component<{}, ISignUpState> {
    private authService: AuthService;

    constructor(props: any) {
        super(props);

        // Set initial state
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

        // Initialize
        this.authService = new AuthService();

        // Bind methods
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Method to bind event from Input component to parent when element is being typed.
     * @param fieldName - element name
     * @param fieldValue - element value
     */
    public onChange = (fieldName: string, fieldValue: string) => {
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
     * Method used to change state of checkbox element.
     * @param fieldValue - element value
     */
    public onCheck = (fieldValue: boolean) => {
        const nextState = {
            values: {
                ...this.state.values,
                isChecked: fieldValue,
            },
        };
        this.setState(nextState);
    };

    /**
     * Validate input based on element name. Simple validation.
     * @param fieldName - element name
     * @param fieldValue - element value
     */
    public validate = (fieldName: string, fieldValue: string) => {
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
    public onSubmit = () => {
        // Validate form before calling api.
        if (this.isFormValid()) {
            if (!this.state.values.isChecked) {
                // If checkbox is not check throw an alert
                alert('Must agree before registering.');
            } else {
                // construct payload for server.
                const {name, email, password} = this.state.values;
                const payload = {
                    name,
                    email,
                    password,
                };
                // Make API call to server after validation is complete.
                apiService('api/users/register', 'post', payload)
                    .then(res => responseHandler(res))
                    .then((res: any) => {
                        this.authService.setToken(res.token);
                        window.location.replace('/home');
                    });
            }
        } else {
            // Validate fields if Form is not valid.
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
                                // Add debounce method to limit http calls to server when registering
                                onClick={debounce(this.onSubmit, 300)}
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
