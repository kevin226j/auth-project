/**
 * Interface for checkbox props
 */
export interface ICheckboxProps {
    name: string;
    checked: boolean;
    id?: string;
    label?: any;
    onCheck: (fieldValue: boolean) => void;
}
