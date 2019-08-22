import * as React from 'react';
import {IInputProps} from './interfaces/IInputProps';
import useForm from 'react-hook-form';

import SimpleReactValidator from 'simple-react-validator';

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
                    style={{paddingBottom: '10px'}}
                    onChange={onChangeInput(props)}
                />
            </div>
            <div style={ErrorMessageStyle(props)}>{props.error}</div>
        </React.Fragment>
    );
};

const ErrorMessageStyle = (props: IInputProps): React.CSSProperties => {
    return {
        margin: '0px',
        top: '-2em',
        fontSize: '12px',
        position: 'relative',
        display: props.error ? 'block' : '',
        color: props.error ? '#ff0033' : 'none',
    };
};

const onBlurInput = (props: IInputProps) => (e: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur(e);
};

const onChangeInput = (props: IInputProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.name, e.currentTarget.value);
};
