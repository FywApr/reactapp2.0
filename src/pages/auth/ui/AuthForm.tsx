import  { FC, FormHTMLAttributes } from 'react';



export const AuthForm: FC<FormHTMLAttributes<HTMLFormElement>> = function AuthForm(props) {
  return (
    <div className='flex flex-1 justify-center items-center'>
        <form 
        {...props}
        className={`p-4 border rounded-lg w-full max-w-lg border-gray-700 ${props.className}`}
        />
    </div>
  )
};