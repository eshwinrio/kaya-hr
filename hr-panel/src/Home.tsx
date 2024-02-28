import { LoaderFunction } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Card, Container, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DashCard from './components/DashCard';
import { useWhoAmI } from './lib/whoami-provider';

export default function Home() {
  const whoAmI = useWhoAmI();
  return (
    <Container>

      {/* Greeting text */}
      <Typography variant="body1" gutterBottom>
        Hello {whoAmI?.currentUser?.firstName}!👋
      </Typography>

      <Grid2 container spacing={2} alignItems="flex-start">

        {/* Section 1 - Greeting 2 and overview */}
        <Grid2 xs={12} sm={6} xl={4}>

          {/* Days greeting */}
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            Good morning!
          </Typography>

          <div>
            <Grid2 container spacing={1}>

              {[
                {
                  title: 'Total employees',
                  icon: <AssignmentIndIcon />,
                  value: 0,
                  backgroundColor: "#CAB7EBD7",
                  color: "#482880"
                },
                {
                  title: 'On leave',
                  icon: <AssignmentIndIcon />,
                  value: 0,
                  backgroundColor: "#E9DACFD7",
                  color: "#482880"
                },
                {
                  title: 'New recruits',
                  icon: <AssignmentIndIcon />,
                  value: 0,
                  backgroundColor: "#D0E3CCD7",
                  color: "#482880"
                },
                {
                  title: 'On notice',
                  icon: <AssignmentIndIcon />,
                  value: 0,
                  backgroundColor: "#E9DACF",
                  color: "#482880"
                }
              ].map((data, index) => (
                <Grid2 xs={6} key={index}>
                  <DashCard elevation={0} sx={{ backgroundColor: data.backgroundColor, color: data.color }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <IconButton size="small" edge="start" color='inherit'>
                        {data.icon}
                      </IconButton>
                      <Typography variant="caption">{data.title}</Typography>
                      <Typography variant="h5">{data.value}</Typography>
                    </Box>
                  </DashCard>
                </Grid2>
              ))}
            </Grid2>
          </div>
        </Grid2>

        <Grid2 xs={12} sm={6} xl={4}>

          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Active employees
          </Typography>

          <Card variant='outlined' elevation={0}>
            <List dense disablePadding>
              {[
                { name: 'Neutral Prajapati', position: 'Software Engineer' },
                { name: 'Sample Rudani', position: 'Software Engineer' },
                { name: 'Template Patel', position: 'Software Engineer' },
              ].map((data, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar variant='rounded' sx={{ width: 36, height: 36 }} />
                    </ListItemIcon>
                    <ListItemText primary={data.name} secondary={data.position} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid2>
      </Grid2 >
    </Container>
  );
}

export const homeLoader: LoaderFunction = async () => {
  // TODO: Add queries to get dashboard summary
  return null;
}
