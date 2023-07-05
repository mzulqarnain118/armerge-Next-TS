import React, { ReactNode } from 'react';
import { useFormik, FormikProps } from 'formik';
import { ObjectSchema } from 'yup';

interface Props {
  initialValues: Record<any, any>;
  onSubmit: (values: Record<string, unknown>) => void;
  validationSchema?: ObjectSchema<any>;
  children: (formik: FormikProps<any>) => ReactNode;
}

const FormikForm: React.FC<Props> = ({ initialValues, onSubmit, validationSchema, children }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {children(formik)}
    </form>
  );
};

export default FormikForm;
