import { useField, FieldAttributes } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

type Props = FieldAttributes<{}> & TextFieldProps & { label: string };

const FormikTextField: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      label={label}
      sx={{ marginBottom: 4 }}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
    />
  );
};

export default FormikTextField;
