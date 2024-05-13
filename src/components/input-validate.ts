import { RegisterOptions } from "react-hook-form";


export const requiredField = {
    required: "Это поле обязатеьное",
};

export const requiredValidateMinLength = (length: number): RegisterOptions => {
    return {
        ...requiredField,
        validate: (value) => value.length > length || `Минимум ${length} символов`
    }
}

export const requiredEmailValidationRule = {
    ...requiredField,
    validate: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(value) || "Некорректный email";
    }
}