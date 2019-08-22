import * as React from 'react';
import {IButtonProps} from './interfaces/IButtonProps';

export const Button: React.StatelessComponent<IButtonProps> = props => {
    return (
        <div className="form-group form-button">
            <button
                disabled={props.disabled}
                type="button"
                name={props.name}
                id={props.id}
                className="form-submit"
                onClick={props.onClick}
                style={buttonDisabledStyle(props)}
            >
                {props.label}
            </button>
        </div>
    );
};

const buttonDisabledStyle = (props: IButtonProps): React.CSSProperties => {
    return {
        opacity: props.disabled ? 0.3 : 1,
    };
};
