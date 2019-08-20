import * as React from 'react';
import {IInputProps} from '../../interfaces/IInputProps';

export const Input: React.StatelessComponent<IInputProps> = props => {
    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={props.name}>
                    <i className={props.icon} style={{color: props.error ? '#ff0033' : 'black'}} />
                </label>
                <input
                    type={props.type}
                    name={props.name}
                    className={props.className}
                    placeholder={props.placeHolder}
                    onChange={onChangeInput(props)}
                    style={{paddingBottom: '10px'}}
                />
            </div>
            <h5 style={ErrorMessageStyle(props)}> {props.error}</h5>
        </React.Fragment>
    );
};

const ErrorMessageStyle = (props: IInputProps): React.CSSProperties => {
    return {
        margin: '0px',
        top: '-2em',
        position: 'relative',
        display: props.error ? 'block' : '',
        color: props.error ? '#ff0033' : 'none',
    };
};

const onChangeInput = (props: IInputProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.name, e.currentTarget.value);
};
