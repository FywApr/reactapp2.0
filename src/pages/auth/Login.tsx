import  { FC } from 'react';
import { AuthForm } from './ui/AuthForm';
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Button } from '../../shared/ui/Button';
import {  requiredValidateMinLength } from '../../components/input-validate';
import { useNavigate } from '@tanstack/react-router';
import { apiService } from '../../app/services/api/ApiService';
import { useAuth } from '../../features/auth';


interface FormType {
    username: string;
    password: string;
}

export const Login: FC= function Login() {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<FormType>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: "onChange",
    });

  return (
    <AuthForm onSubmit={handleSubmit(async(form) => {
        const response = await apiService.post<string>({
            url:"/auth/login",
            dto: form,
        });

        if (response.data) {
            setToken(response.data);
            
            navigate({ to: "/" });
        }
    })}>
        <Controller
        name={"username"}
        control={control}
        rules={requiredValidateMinLength(6)}
        render={({ field, fieldState: { error }}) => (
            <TextField
            {...field}
            error={Boolean(error?.message)}
            helperText={error?.message}
            label={"Логин"}
            fullWidth={true}
            variant={'standard'}
            />
        )}
        />
        <Controller
        name={"password"}
        control={control}
        rules={requiredValidateMinLength(6)}
        render={({ field, fieldState: { error }}) => (
            <TextField
            {...field}
            type={'password'}
            error={Boolean(error?.message)}
            helperText={error?.message}
            label={"Пароль"}
            fullWidth={true}
            variant={'standard'}
            />
        )}
        />
        <Button disabled={!isValid} type="submit">
            {"Войти"}
        </Button>
    </AuthForm>
  )
};