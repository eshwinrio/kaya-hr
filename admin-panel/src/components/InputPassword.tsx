import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';

type InputPasswordProps = Exclude<TextFieldProps, 'type'>;
export default function InputPassword(props: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        startAdornment: <PasswordIcon color='inherit' sx={{ mr: 2 }} />,
        endAdornment: (
          <IconButton onClick={setShowPassword.bind(null, state => !state)}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        ),
      }}
      {...props} />
  );
}
