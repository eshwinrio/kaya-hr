import { ApolloQueryResult } from '@apollo/client';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useModal } from 'mui-modal-provider';
import { FC, useEffect, useState } from 'react';
import { ActionFunction, Form, useActionData } from 'react-router-dom';
import { apolloClient } from '../lib/apollo';
import dayjs from '../lib/dayjs';
import { CreateScheduleMutation, PickUserDialogQuery, ScheduleInput } from '../lib/gql-codegen/graphql';
import { CREATE_SCHEDULE } from '../lib/gql-queries';
import AlertDialog from '../shared/AlertDialog';
import PickUserDialog from '../shared/PickUserDialog';


const initialFormData: ScheduleInput = {
  title: '', notes: '',
  dateTimeStart: '', dateTimeEnd: '',
  assignees: [],
};

const ScheduleEditorPage: FC = () => {
  const [formData, setFormData] = useState<ScheduleInput>({ ...initialFormData });
  const [users, setUsers] = useState<PickUserDialogQuery['users']>([]);
  const [errors, setErrors] = useState<ScheduleInput>({ ...initialFormData });
  const actionData = useActionData() as ScheduleEditorAction;
  const { showModal } = useModal();

  useEffect(() => {
    if (actionData && actionData.errors) {
      const modal = showModal(AlertDialog, {
        title: 'Error',
        message: actionData.errors.map((error) => error.message).join(', '),
      });
      return modal.destroy;
    }
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    switch (event.target.name) {
      case 'dateTimeStart':
        setErrors({
          ...errors,
          dateTimeStart: dayjs(event.target.value).isValid()
            ? dayjs(event.target.value).isAfter(dayjs())
              ? ''
              : 'Cannot schedule in the past'
            : 'Invalid date',
        });
        break;
      case 'dateTimeEnd':
        setErrors({
          ...errors,
          dateTimeEnd: dayjs(event.target.value).isValid()
            ? dayjs(event.target.value).isAfter(dayjs(formData.dateTimeStart))
              ? ''
              : 'Cannot schedule in the past'
            : 'Invalid date',
        });
        break;
    }
  }

  const openUserPicker = () => {
    const picker = showModal(PickUserDialog, {
      maxWidth: 'xs',
      fullWidth: true,
      onPick(user) {
        setUsers(current => [...current, user]);
        picker.hide();
      },
    });
  }

  return (
    <Container maxWidth='xl'>
      <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }}>Create Schedule</Typography>
      <Form method='post' autoComplete='on'>

        {/* Section 1: Schedule details */}
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 3 }}>Schedule details</Typography>
        <Grid2 container direction='row' spacing={2}>
          <Grid2 xs={12} lg={4}>
            <TextField
              type='text'
              name='title' label='Title'
              variant='outlined' fullWidth
              autoFocus required
              defaultValue={formData.title}
              onChange={onChange}
              error={!!errors.title} helperText={errors.title}
            />
          </Grid2>
          <Grid2 xs={12}>
            <TextField
              type='text'
              name='description' label='Description'
              variant='outlined' multiline rows={2} fullWidth
              defaultValue={formData.notes}
              onChange={onChange}
              helperText="Helps assignees to understand the purpose of the schedule"
            />
          </Grid2>
        </Grid2>

        {/* Section 2: Schedule time */}
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, mt: 5 }}>Schedule timing</Typography>
        <Grid2 container direction='row' spacing={2}>
          <Grid2 xs={12} sm={6} lg={4}>
            <DateTimePicker
              name='dateTimeStart' label="Starts at"
              slotProps={{ textField: { required: true } }}
              value={dayjs(formData.dateTimeStart)}
              onChange={(value) => setFormData({
                ...formData,
                dateTimeStart: value?.toISOString() ?? '',
                ...(formData.dateTimeEnd
                  ? dayjs(formData.dateTimeEnd).isBefore(value) ? { dateTimeEnd: dayjs(value).add(1, 'hour').toISOString() } : {}
                  : {}
                )
              })}
              disablePast
              sx={{ width: '100%' }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6} lg={4}>
            <DateTimePicker
              name='dateTimeEnd' label="Ends at"
              slotProps={{ textField: { required: true } }}
              disabled={!formData.dateTimeStart || errors.dateTimeStart !== ''}
              value={dayjs(formData.dateTimeEnd)}
              onChange={(value) => setFormData({ ...formData, dateTimeEnd: value?.toISOString() ?? '' })}
              minDateTime={dayjs(formData.dateTimeStart)}
              sx={{ width: '100%' }}
            />
          </Grid2>
          {formData.dateTimeEnd && <Grid2 xs={12}>
            <Typography variant='body2' color='error'>
              Schedule will last for {dayjs.duration(dayjs(formData.dateTimeEnd).diff(dayjs(formData.dateTimeStart))).humanize()}
            </Typography>
          </Grid2>}
          <Grid2 xs={12}>
            <TextField
              type='text'
              name='notes' label='Additonal notes'
              variant='outlined' multiline rows={4} fullWidth
              defaultValue={formData.notes}
              onChange={onChange}
              helperText="Optional extra information about the schedule"
            />
          </Grid2>
        </Grid2>

        {/* Section 4: Choose assignees */}
        <Toolbar disableGutters sx={{ mt: 5, justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight='bold'>Schedule assignees</Typography>
          <Button color='primary' onClick={openUserPicker}>Pick assignees</Button>
        </Toolbar>
        <List disablePadding>
          {users.map((user, index) => (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText primary={user?.firstName + " " + user?.lastName} secondary={user?.email} />
              </ListItemButton>
              <input type='hidden' name='assignees' key={index} value={user?.id} />
            </ListItem>
          ))}
        </List>


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
        </Grid2>
      </Form>
    </Container>
  );
}

export default ScheduleEditorPage;

type ScheduleEditorAction = Awaited<ApolloQueryResult<CreateScheduleMutation>>;
export const scheduleEditorAction: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  return await apolloClient.mutate({
    mutation: CREATE_SCHEDULE,
    variables: {
      input: {
        title: formData.get('title')!.toString(),
        description: formData.get('description')!.toString(),
        notes: formData.get('notes')!.toString(),
        dateTimeStart: formData.get('dateTimeStart')!.toString(),
        dateTimeEnd: formData.get('dateTimeEnd')!.toString(),
        assignees: formData.getAll('assignees').map(value => ({ userId: parseInt(value.valueOf().toString(), 10) })),
      }
    }
  });
}
