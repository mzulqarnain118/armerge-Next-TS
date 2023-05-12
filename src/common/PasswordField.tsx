import {useState} from 'react';
import { useField } from 'formik';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextFieldProps } from '@mui/material';
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui';

interface PasswordFieldProps extends TextFieldProps {
  label: string;
  name: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ marginBottom: 4 }} fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        {...props}
        id={name}
        label={label}
        type={showPassword ? 'text' : 'password'}
        error={meta.touched && Boolean(meta.error)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              edge='end'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              aria-label='toggle password visibility'
            >
              {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta.touched && meta.error ? (
        <div style={{ color: 'red',fontSize:"12px" }}>{meta.error}</div>
      ) : null}
    </FormControl>
  );
};

export default PasswordField;
