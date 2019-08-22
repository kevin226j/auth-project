import * as React from 'react';
import {IInputProps} from './interfaces/IInputProps';

/**
 * Input component that includes IInputProps interface to props.
 * @param props - extends to IInputProps
 */
export const Input: React.StatelessComponent<IInputProps> = props => {
    return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor={props.name}>
                    {/* Style changes based on error */}
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
            {/* Style changes based on error determined by ErrorMessageStyle function */}
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

/**
 * Method is provided to help with onBlur functionality.
 * @param props - extends to IInputProps and React.FocusEvent
 */
const onBlurInput = (props: IInputProps) => (e: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur(e);
};

/**
 * Function that used to pass parent Event function to child Event function using props.
 * Event looks for name and value of element
 * @param props - extends to IInputProps and React.FocusEvent
 */
const onChangeInput = (props: IInputProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.name, e.currentTarget.value);
};
