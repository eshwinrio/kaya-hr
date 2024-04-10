import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { ActionFunction, Form, Link, useActionData, useNavigate } from 'react-router-dom';
import validator from 'validator';
import logo from '../../assets/logo-full.svg';
import InputPassword from '../../components/InputPassword';
import { fetchAccessToken } from '../../lib/fetch-requests';
import { useMaterialTheme } from '../../lib/material-theme';

const initialFormData: Record<'username' | 'password', string> = {
  username: '',
  password: ''
}

const AuthIndex: FC = (d: any) => {
  const { breakpoints } = useMaterialTheme();
  const actionData = useActionData() as { message: string };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({ ...initialFormData });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    switch (event.target.name) {
      case 'username':
        setErrors({
          ...errors,
          username: validator.isEmpty(event.target.value) || validator.isEmail(event.target.value)
            ? ''
            : 'Invalid email'
        });
        break;
    }
  }

  useEffect(() => {
    if (actionData) {
      setErrors({ ...initialFormData });
    } else {
      navigate('../', { replace: true });
    }
  }, [actionData, navigate]);


  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
      [breakpoints.up('xs')]: {
        padding: 4
      }
    }}>
      <Card variant='outlined' sx={{ maxWidth: breakpoints.values.xs, width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <img src={logo} alt="logo" width={96} />
            <Divider orientation='vertical' flexItem sx={{ my: 0.2 }} />
            <Typography variant='h6' lineHeight={1}>Dashboard Login</Typography>
          </Box>
          <Form method='post' autoComplete='on'>
            <TextField
              type='text'
              name='username' label='Username'
              variant='outlined' sx={{ mt: 4 }} fullWidth
              autoFocus required
              value={formData.username} onChange={onChange}
              error={!!errors.username} helperText={errors.username}
            />
            <InputPassword
              name='password' label='Password'
              variant='outlined' sx={{ mt: 2 }} fullWidth
              required
              value={formData.password} onChange={onChange}
              error={!!errors.password} helperText={errors.password}
            />
            {actionData?.message && <Alert severity='error' sx={{ mt: 2 }}>{actionData.message}</Alert>}
            <Button component={Link} to='./forgot-password'>Forgot Password?</Button>
            <Button
              type='submit'
              variant='contained' color='primary'
              sx={{ mt: 4, width: '100%' }}
            >
              Login
            </Button>
          </Form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AuthIndex;
export const authIndexAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get('username')!.toString();
  const password = formData.get('password')!.toString();
  return await fetchAccessToken(username, password);
}

export { default as ForgotPassword, forgotPasswordAction } from './forgot-password';
export { default as ResetPassword, resetPasswordAction } from './reset-password';
