import { useState } from 'react';
import { ActionFunction, Form } from 'react-router-dom';
import validator from 'validator';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid2 from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SelectRole from './components/SelectRole';
import InputPassword from './components/InputPassword';
import { apolloClient } from './lib/apollo';
import { CREATE_USER } from './lib/gql-queries';

type FormKeys =
  | 'firstName'
  | 'middleName'
  | 'lastName'
  | 'dateOfBirth'
  | 'email'
  | 'phone'
  | 'streetName'
  | 'addressL2'
  | 'city'
  | 'pincode'
  | 'province'
  | 'country'
  | 'dateJoined'
  | 'password'
type EmployeeAddFormData = Record<FormKeys, string>;

const initialFormData: EmployeeAddFormData = {
  firstName: '', middleName: '', lastName: '', dateOfBirth: '',
  email: '', phone: '', streetName: '', addressL2: '', city: '', pincode: '', province: '', country: '',
  password: '',
  dateJoined: ''
};

export default function EmployeeAdd() {

  const [formData, setFormData] = useState<EmployeeAddFormData>({ ...initialFormData });
  const [errors, setErrors] = useState<EmployeeAddFormData>({ ...initialFormData });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    switch (event.target.name) {
      case 'firstName':
        setErrors({
          ...errors,
          firstName: validator.isEmpty(event.target.value) || validator.isAlpha(event.target.value)
            ? ''
            : 'Only alphabets'
        });
        break;
      case 'middleName':
        setErrors({
          ...errors,
          middleName: validator.isAlpha(event.target.value)
            ? ''
            : 'Only alphabets'
        });
        break;
      case 'lastName':
        setErrors({
          ...errors,
          lastName: validator.isEmpty(event.target.value) || validator.isAlpha(event.target.value)
            ? ''
            : 'Only alphabets'
        });
        break;
      case 'dateOfBirth':
        setErrors({
          ...errors,
          dateOfBirth: validator.isDate(event.target.value)
            ? ''
            : 'Invalid date'
        });
        break;
      case 'email':
        setErrors({
          ...errors,
          email: validator.isEmpty(event.target.value) || validator.isEmail(event.target.value)
            ? ''
            : 'Invalid email'
        });
        break;
      case 'phone':
        break;
      case 'pincode':
        setErrors({
          ...errors,
          pincode: validator.isPostalCode(event.target.value, 'CA')
            ? ''
            : 'Invalid PIN code'
        });
        break;
    }
  }

  return (
    <Container maxWidth='xl'>
      <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }}>Add employee</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Form method='post' autoComplete='on'>

          {/* Section 1: Employee identity */}
          <Typography variant='h6' fontWeight='bold' sx={{ mb: 3 }}>Employee Identity</Typography>
          <Grid2 container direction='row' spacing={2}>
            <Grid2 xs={12} lg={4}>
              <TextField
                type='text'
                name='firstName' label='First Name'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.firstName} helperText={errors.firstName}
              />
            </Grid2>
            <Grid2 xs={12} sm={6} lg={4}>
              <TextField
                type='text'
                name='middleName' label='Middle Name'
                variant='outlined' fullWidth
                autoFocus
                onChange={onChange}
                error={!!errors.middleName} helperText={errors.middleName}
              />
            </Grid2>
            <Grid2 xs={12} sm={6} lg={4}>
              <TextField
                type='text'
                name='lastName' label='Last Name'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.lastName} helperText={errors.lastName}
              />
            </Grid2>
            <Grid2 xs={12} sm={6} lg={4}>
              <DatePicker
                name='dateOfBirth' label="DOB"
                defaultValue={dayjs(formData.dateOfBirth)}
                disableFuture
                sx={{ width: '100%' }}
              />
            </Grid2>
          </Grid2>

          {/* Section 2: Contact details */}
          <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, mt: 5 }}>Employee contact</Typography>
          <Grid2 container direction='row' spacing={2}>
            <Grid2 xs={12} sm={6}>
              <TextField
                type='text'
                name='email' label='Email Address'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.email} helperText={errors.email}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                type='tel'
                name='phone' label='Phone Number'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.phone} helperText={errors.phone}
              />
            </Grid2>
            <Grid2 xs={12} >
              <TextField
                type='text'
                name='streetName' label='Street Name'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.streetName} helperText={errors.streetName}
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                type='text'
                name='addressL2' label='Address Line 2'
                variant='outlined' fullWidth
                autoFocus
                value={formData.addressL2} onChange={onChange}
                error={!!errors.addressL2} helperText={errors.addressL2}
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                type='text'
                name='city' label='City'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.city} helperText={errors.city}
              />
            </Grid2>
            <Grid2 xs={6} sm={4}>
              <TextField
                type='text'
                name='province' label='Province'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.province} helperText={errors.province}
              />
            </Grid2>
            <Grid2 xs={6} sm={4}>
              <TextField
                type='text'
                name='pincode' label='Pin Code'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.pincode} helperText={errors.pincode}
              />
            </Grid2>
            <Grid2 xs={12} sm={4}>
              <TextField
                type='text'
                name='country' label='Country'
                variant='outlined' fullWidth
                autoFocus required
                onChange={onChange}
                error={!!errors.country} helperText={errors.country}
              />
            </Grid2>
          </Grid2>

          {/* Section 3: Initial security details */}
          <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, mt: 5 }}>Account security</Typography>
          <Grid2 container direction='row' spacing={2}>
            <Grid2 xs={12} sm={6} lg={4}>
              <InputPassword
                name='password' label='Password'
                variant='outlined' fullWidth
                required
                onChange={onChange}
                error={!!errors.password} helperText={errors.password}
              />
            </Grid2>
            <Grid2 xs={12}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Require password change?" />
            </Grid2>
          </Grid2>

          {/* Section 4: Employment details */}
          <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, mt: 5 }}>Employment setup</Typography>
          <Grid2 container direction='row' spacing={2}>
            <Grid2 xs={12} sm={6}>
              <DatePicker
                name='dateJoined' label="Date of joining"
                defaultValue={dayjs(formData.dateJoined)}
                sx={{ width: '100%' }} />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='inputLabel-role-select'>Role</InputLabel>
                <SelectRole name='role' label='Role' labelId='inputLabel-role-select' />
              </FormControl>
            </Grid2>
          </Grid2>

          {/* Section 5: Form actions */}
          <Typography variant='body2' sx={{ mb: 2, mt: 5 }}>Ready to submit? If you to continue later, choose <em>Save Draft</em>.</Typography>
          <Grid2 container direction='row' alignItems="baseline" spacing={2} sx={{ mb: 2 }}>
            <Grid2>
              <IconButton type='reset' color='error' edge="start">
                <ReplayIcon />
              </IconButton>
            </Grid2>
            <Grid2>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid2>
            <Grid2>
              <Button color='secondary'>
                Save Draft
              </Button>
            </Grid2>
          </Grid2>
        </Form>
      </LocalizationProvider>
    </Container >
  );
}

export const employeeAddAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const response = await apolloClient.mutate({
    mutation: CREATE_USER,
    variables: {
      input: {
        firstName: formData.get('firstName')!.toString(),
        middleName: formData.get('middleName')?.toString(),
        lastName: formData.get('lastName')!.toString(),
        dateOfBirth: formData.get('dateOfBirth')!.toString(),
        email: formData.get('email')!.toString(),
        phone: formData.get('phone')!.toString(),
        streetName: formData.get('streetName')!.toString(),
        addressL2: formData.get('addressL2')!.toString(),
        city: formData.get('city')!.toString(),
        province: formData.get('province')!.toString(),
        pincode: formData.get('pincode')!.toString(),
        country: formData.get('country')!.toString(),
        password: formData.get('password')!.toString(),
        dateJoined: formData.get('dateJoined')!.toString(),
        roleIds: formData.get('role')!.toString().split(',').map(Number),
      }
    }
  });

  // TODO: Redirect to employee view using the `id` in the response
  return response.data;
}
