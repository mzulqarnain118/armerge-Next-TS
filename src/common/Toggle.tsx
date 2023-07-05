import { Switch } from '@mui/material';

export default function Toggle  ({ checked, onChange })  {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      inputProps={{ 'aria-label': 'Toggle Switch' }}
    />
  );
};