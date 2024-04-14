import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { ActionFunction, Form, useActionData } from 'react-router-dom';
import validator from 'validator';
import logo from '../../assets/logo-full.svg';
import InputPassword from '../../components/InputPassword';
import { resetPassword } from '../../lib/fetch-requests';
import { useMaterialTheme } from '../../lib/material-theme';

const initialFormData = {
  tryPassword: '',
  password: ''
}

const ResetPassword: FC = function Login() {
  const { breakpoints } = useMaterialTheme();
  const actionData = useActionData() as { message: string };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({ ...initialFormData });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    switch (event.target.name) {
      case 'password':
        setErrors({
          ...errors,
          password: validator.isEmpty(event.target.value) || validator.isStrongPassword(event.target.value)
            ? ''
            : 'Password is too weak',
        });
        break;
      case 'tryPassword':
        setErrors({
          ...errors,
          tryPassword: validator.isEmpty(event.target.value) || event.target.value === formData.password
            ? ''
            : 'Password does not match',
        });
        break;
    }
  }

  useEffect(() => {
    if (actionData) {
      setErrors({ ...initialFormData });
    }
  }, [actionData]);


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
            <Typography variant='h6' lineHeight={1}>Password Reset</Typography>
          </Box>
          {actionData
            ? <Alert severity='success' sx={{ mt: 2 }}>{actionData.message}</Alert>
            : (
              <Form method='post' autoComplete='on'>
                <InputPassword
                  name='password' label='Password'
                  variant='outlined' sx={{ mt: 2 }} fullWidth
                  required
                  value={formData.password} onChange={onChange}
                  error={!!errors.password} helperText={errors.password}
                />
                <InputPassword
                  name='tryPassword' label='Confirm again'
                  variant='outlined' sx={{ mt: 2 }} fullWidth
                  required
                  value={formData.tryPassword} onChange={onChange}
                  error={!!errors.password} helperText={errors.password}
                />
                <Button
                  type='submit'
                  variant='contained' color='primary'
                  sx={{ mt: 4, width: '100%' }}>
                  Update
                </Button>
              </Form>
            )
          }
        </CardContent>
      </Card>
    </Box>
  );
}

export default ResetPassword;

export const resetPasswordAction: ActionFunction = async ({ request }) => {
  const resetToken = new URL(request.url).searchParams.get('token');
  if (!resetToken) {
    throw new Response('Invalid request', { status: 400 });
  }
  const formData = await request.formData();
  const password = formData.get('password')!.toString();
  const result = await resetPassword(resetToken, password);
  if (!result) {
    return {
      message: 'Password reset failed'
    }
  }
  return {
    message: 'Password reset successfully'
  }
}
