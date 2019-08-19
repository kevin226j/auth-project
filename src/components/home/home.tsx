import * as React from 'react';
import {AuthService} from '../../services/auth_service';
import {apiService} from '../../services/api_service';
import {authHeader} from '../../utils/auth_header';
import {debounce} from '../../helpers/debounce';
import {responseHandler} from '../../helpers/response_handler';

interface IMessageState {
    message: string;
}

export class Home extends React.Component<{}, IMessageState> {
    private authService: AuthService;

    constructor(props: any) {
        super(props);
        this.state = {
            message: '',
        };
        this.authService = new AuthService();
        this.logout = this.logout.bind(this);
        this.onClick = this.onClick.bind(this);
    }

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

    public onClick(e: any) {
        apiService('api/users/test', 'get', null, authHeader())
            .then(res => responseHandler(res))
            .then(res => {
                this.setState({
                    message: res.message,
                });
            });
    }

    public logout(e: any) {
        e.preventDefault();
        this.authService.logout();
        window.location.replace('/');
    }
}
