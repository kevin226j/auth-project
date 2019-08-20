export interface IInputProps {
    name: string;
    type: string;
    className: string;

    label?: string;
    placeHolder?: string;
    error?: string;
    icon?: string;
    id?: string;

    onChange: (fieldName: string, fieldValue: any) => void;
}
