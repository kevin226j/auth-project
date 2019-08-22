/**
 * Interface for button props
 */
export interface IButtonProps {
    id: string;
    name: string;
    label: string;
    disabled?: boolean;
    onClick: () => void;
}
