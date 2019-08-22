import * as React from 'react';
import {ICheckboxProps} from './interfaces/ICheckboxProps';

/**
 * Checkbox component that includes ICheckboxProps interface to props.
 * @param props - extends to ICheckboxProps
 */
export const CheckBox: React.StatelessComponent<ICheckboxProps> = props => {
    return (
        <React.Fragment>
            <div className="form-group">
                <input
                    id={props.id ? props.id : 'agree-term'}
                    type="checkbox"
                    name={props.name}
                    className="agree-term"
                    aria-checked="true"
                    checked={props.checked}
                    onChange={onCheck(props)}
                />
                <label htmlFor={props.name} className="label-agree-term">
                    <span>
                        <span />
                    </span>
                    {props.label}
                </label>
            </div>
        </React.Fragment>
    );
};

/**
 * Function that used to pass parent Event function to child Event function using props.
 * Event looks for checked node
 * @param props
 */
const onCheck = (props: ICheckboxProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onCheck(e.target.checked);
};
