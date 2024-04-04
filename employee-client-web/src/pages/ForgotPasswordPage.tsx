import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { ActionFunction, Form, useActionData } from 'react-router-dom';
import validator from 'validator';
import logo from '../assets/logo-full.svg';
import { forgotPassword } from '../lib/fetch-requests';
import { useMaterialTheme } from '../lib/material-theme';

const initialFormData = {
  email: '',
}

const ForgotPasswordPage: FC = () => {
  const { breakpoints } = useMaterialTheme();
  const actionData = useActionData() as { message: string };
  const [formData, setFormData] = useState({...initialFormData});
  const [errors, setErrors] = useState({ ...initialFormData });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    switch (event.target.name) {
      case 'email':
        setErrors({
          ...errors,
          email: validator.isEmpty(event.target.value) || validator.isEmail(event.target.value)
            ? ''
            : 'Invalid email',
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
          <Form method='post' autoComplete='on'>
            <TextField
              type='text'
              name='email' label='Username'
              variant='outlined' sx={{ mt: 4 }} fullWidth
              autoFocus required
              value={formData.email} onChange={onChange}
              error={!!errors.email} helperText={errors.email}
            />
            {actionData?.message 
              ? <Alert severity='error' sx={{ mt: 2 }}>{actionData.message}</Alert>
              : <Button
              type='submit'
              variant='contained' color='primary'
              sx={{ mt: 4, width: '100%' }}>
              Proceed
            </Button>}
          </Form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ForgotPasswordPage;

export const forgotPasswordAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')!.toString();
  if (!email) {
    throw new Response('Invalid request', { status: 400 });
  }
  await forgotPassword(email);
  return {
    message: 'Password reset link sent to ' + email
  }
}
