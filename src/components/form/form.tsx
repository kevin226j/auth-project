import * as React from 'react';
import {IFormProperties} from './interfaces/IFormProperties';

export const Form: React.StatelessComponent<IFormProperties> = props => {
    return (
        <div className={props.formClassName}>
            <h2 className="form-title">{props.title}</h2>
            <form className={props.className} id={props.id}>
                {props.children}
            </form>
        </div>
    );
};
