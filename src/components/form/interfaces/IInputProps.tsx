/**
 * Interface for input props.
 */
export interface IInputProps {
    name: string;
    type: string;
    className: string;

    label?: string;
    placeHolder?: string;
    error?: string;
    icon?: string;
    id?: string;
    errors?: string;

    onChange: (fieldName: string, fieldValue: any) => void;
    onBlur?: (e: any) => void;
}
