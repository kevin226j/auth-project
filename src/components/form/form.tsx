import * as React from 'react';
import {IFormProps} from './interfaces/IFormProps';

/**
 * Form component that includes IFormProps interface to props.
 * @param props - extends to IFormProps
 */
export const Form: React.StatelessComponent<IFormProps> = props => {
    return (
        <div className={props.formClassName}>
            <h2 className="form-title">{props.title}</h2>
            <form className={props.className} id={props.id}>
                {/* Pass children components into form here */}
                {props.children}
            </form>
        </div>
    );
};
