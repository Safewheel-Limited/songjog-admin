import React from "react";
import { Checkbox as AntCheckbox } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/common/utils";

interface CheckboxProps {
    name: string;
    label?: string;
    defaultValue?: boolean;
    disabled?: boolean;
}

const FormCheckbox: React.FC<CheckboxProps> = ({
    name,
    label,
    defaultValue = false,
    disabled = false,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <AntCheckbox
                        {...field}
                        disabled={disabled}
                        defaultChecked={defaultValue}
                        checked={field.value}
                    >
                        {label}
                    </AntCheckbox>
                )}
            />
            {errorMessage && <small style={{ color: "red" }}>{errorMessage}</small>}
        </div>
    );
};

export default FormCheckbox;
