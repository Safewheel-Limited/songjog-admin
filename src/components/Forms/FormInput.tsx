"use client";

// external imports
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

// internal imports
import { getErrorMessageByPropertyName } from "@/common/utils";

interface IInput {
    name: string;
    type?: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
    required?: boolean;
}

const FormInput = ({
    name,
    type,
    size = "large",
    value,
    id,
    placeholder,
    validation,
    label,
    required,
}: IInput) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const errorMessage = getErrorMessageByPropertyName(errors, name);
    return (
        <div>
            {required ? (
                <span
                    style={{
                        color: "red",
                    }}
                >
                    *
                </span>
            ) : null}
            {label ? <span>{label}</span> : null}
            <Controller
                control={control}
                name={name}
                render={({ field }) =>
                    type === "password" ? (
                        <Input.Password
                            type={type}
                            size={size}
                            placeholder={placeholder}
                            {...field}
                            value={value ? value : field.value}
                        />
                    ) : (
                        <Input
                            type={type}
                            size={size}
                            placeholder={placeholder}
                            {...field}
                            value={value ? value : field.value}
                        />
                    )
                }
            />
            <small style={{ color: "red" }}>{errorMessage}</small>
        </div>
    );
};

export default FormInput;