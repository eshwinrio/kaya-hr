import { CheckCircle } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';

export default function PricingPage() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h2" style={{ textTransform: "uppercase", marginBottom: "10px" }}>
          Our <span style={{ color: "#6e11e4" }}>Pricing</span>
        </Typography>
        <Typography variant="h4">Check out our premium memberships</Typography>
      </Box>
      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={4} sm={12}>
          <Card elevation={3}>
            <CardActionArea>
              <CardMedia
                image="https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=100&w=648&auto=format&fit=crop"
                alt="hot-air-balloon"
                sx={{ height: "150px" }}
              />
              <CardContent>
                <Typography variant="h6">Basic</Typography>
                <List>
                  {['20 Employees', 'Free Training', 'Employee Schedule', 'Limited Support'].map((text, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircle />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h5">Free</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={4} sm={12}>
          <Card elevation={3}>
            <CardActionArea>
              <CardMedia
                image="https://images.unsplash.com/photo-1519764803046-8ba615c54c0c?q=100&w=648&auto=format&fit=crop"
                alt="hot-air-balloon"
                sx={{ height: "150px" }}
              />
              <CardContent>
                <Typography variant="h6">Silver</Typography>
                <List>
                  {['Unlimited Employees', 'Pro Training', 'Employee Schedule', 'Daily Support'].map((text, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircle />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h5">$29.99</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={4} sm={12}>
          <Card elevation={3}>
            <CardActionArea>
              <CardMedia
                image="https://images.unsplash.com/photo-1516041774595-cc1b7969480c?q=100&w=648&auto=format&fit=crop"
                alt="hot-air-balloon"
                sx={{ height: "150px" }}
              />
              <CardContent>
                <Typography variant="h6">Gold</Typography>
                <List>
                  {['Unlimited Employees', 'Pro Training', 'Employee Schedule', 'Advanced Support'].map((text, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemIcon>
                        <CheckCircle />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h5">$49.99</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};
