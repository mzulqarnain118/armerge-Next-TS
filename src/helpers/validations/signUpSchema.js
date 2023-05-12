import * as Yup from 'yup';
export const signUpSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'Too Short!').max(30, 'Too Long!').required('First name is required').matches(/[a-zA-Z]/, 'Only alphabets are allowed') ,
    lastName: Yup.string().min(3, 'Too Short!').max(30, 'Too Long!').required("Last name is required").matches(/[a-zA-Z]/, 'Only alphabets are allowed'),
    // username: Yup.string().min(3, 'Too Short!').matches(/[a-zA-Z0-9_]*/, 'It can only contain letters, numbers, and underscore.').max(30, 'Too Long!')
    //     .required("User name is required"), 
    email: Yup.string().min(3, 'Too Short!')
        .max(100, 'Too Long!').email('Invalid email').required('Email is required'),
    // telePhone: Yup.string().required("Contact number is required"),
    password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')

});
