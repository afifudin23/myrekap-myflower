import { Control } from "react-hook-form";

export type InputTextProps = {
    label: string;
    name: string;
    error?: string;
    control?: Control<any>;
};

export type InputDropdownProps = {
    label: string;
    options: string[];
    name: string;
    error?: string;
    control: Control<any>;
    width?: string;
    className?: string;
    formInput?: boolean;
    disabled?: boolean;
};
export type InputDateProps = {
    label: string;
    name: string;
    error?: string;
    control: Control<any>;
};

export type InputFileProps = {
    label: string;
    name: string;
    error?: string;
    control: Control<any>;
    disabled?: boolean;
    setValue?: any; // Fix NoImplicitAny
    getValues?: any;
};

export type InputMoneyProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: string;
};
