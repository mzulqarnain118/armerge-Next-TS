import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});