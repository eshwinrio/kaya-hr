import { ActionFunction, Form, redirect } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import validator from 'validator';
import { useMaterialTheme } from './lib/material-theme';
import logo from './assets/logo-full.svg';
import { useState } from 'react';
import { fetchAccessToken } from './lib/fetch-requests';

export default function Login(d: any) {
  const { breakpoints } = useMaterialTheme();
  const [formData, setFormData] = useState<Record<'username' | 'password', string>>({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<'username' | 'password', string>>({
    username: '',
    password: ''
  });

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
      case 'password':
        setErrors({
          ...errors,
          password: validator.isEmpty(event.target.value) || validator.isStrongPassword(event.target.value)
            ? ''
            : 'Weak password'
        });
        break;
    }
  }

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
            <TextField
              type='password'
              name='password' label='Password'
              variant='outlined' sx={{ mt: 2 }} fullWidth
              required
              value={formData.password} onChange={onChange}
              error={!!errors.password} helperText={errors.password}
            />
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

export const loginAction: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }
  const response = await fetchAccessToken(username, password);
  if (response.ok) {
    return redirect('/');
  } else {
    return { error: 'Invalid credentials' };
  }
}
