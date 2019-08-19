import * as React from 'react';
import {AuthService} from '../../services/auth_service';

export class Home extends React.Component {
    private authService: AuthService;

    constructor(props: any) {
        super(props);
        this.authService = new AuthService();
        this.logout = this.logout.bind(this);
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
                </div>
            </div>
        );
    }

    public logout(e: any) {
        e.preventDefault();
        this.authService.logout();
        window.location.replace('/');
    }
}
