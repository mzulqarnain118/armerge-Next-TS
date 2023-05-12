import * as Yup from 'yup';
export const editUserProfileYup = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('First name is required'),
  last_name: Yup.string().min(3, 'Too Short!')
    .max(30, 'Too Long!').required("Last name is required"),
  username: Yup.string().min(3, 'Too Short!')
    .max(30, 'Too Long!').required("User name is required"),
  email: Yup.string().min(3, 'Too Short!')
    .max(100, 'Too Long!').email('Invalid email').required('Email is required'),
  contact: Yup.string().required("Contact number is required").matches(/^[0-9]+$/, "Must be only digits"),

});
