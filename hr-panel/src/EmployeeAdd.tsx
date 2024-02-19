import { Button, Container, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import validator from 'validator';

export default function EmployeeAdd() {

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
    <Container>
      <Typography variant='h5' fontWeight='bold' gutterBottom>Add employee</Typography>
      <Form method='post' autoComplete='on'>
        <Grid2 container direction='row' spacing={2}>
          <Grid2 xs={12} lg={4}>
            <TextField
              type='text'
              name='username' label='First Name'
              variant='outlined' fullWidth
              autoFocus required
              
              value={formData.username} onChange={onChange}
              error={!!errors.username} helperText={errors.username}
            />
          </Grid2>
          <Grid2 xs={12} sm={6} lg={4}>
            <TextField
              type='text'
              name='username' label='Middle Name'
              variant='outlined' fullWidth
              autoFocus required
              value={formData.username} onChange={onChange}
              error={!!errors.username} helperText={errors.username}
            />
          </Grid2>
          <Grid2 xs={12} sm={6} lg={4}>
            <TextField
              type='text'
              name='username' label='Last Name'
              variant='outlined' fullWidth
              autoFocus required
              value={formData.username} onChange={onChange}
              error={!!errors.username} helperText={errors.username}
            />
          </Grid2>
        </Grid2>
        
        <TextField
          type='text'
          name='username' label='First Name'
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
    </Container >
  );
}
