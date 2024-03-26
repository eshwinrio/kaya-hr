import { Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';


const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    background: '#ccacf7',
    paddingTop: '100px',
    paddingBottom: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: '586px',
    width: '300px',
    borderRadius: '20px',
    // margin: '0 10px',
    margin: "auto",
    background: '#FFF',
    boxShadow: '0 1rem 2rem rgba(0, 0, 0, 20%)',
    [theme.breakpoints.down('md')]: {
      height: '700px',
      overflowY: 'auto',
    },
  },
  title: {
    width: '100%',
    padding: '10px 0',
    fontSize: '1.2em',
    fontWeight: 'lighter',
    textAlign: 'center',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    background: '#6e11e4',
    color: '#F5F5F4',
  },
  view: {
    width: '100%',
    padding: '30px 0 20px',
    background: '#F5F5F4',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconImg: {
    width: '70px',
  },
  cost: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '10px',
  },
  amount: {
    fontSize: '2.8em',
    fontWeight: 'bolder',
  },
  detail: {
    margin: 'auto 0 auto 5px',
    width: '70px',
    fontSize: '0.7em',
    fontWeight: 'bold',
    lineHeight: '15px',
    color: '#7D7C7C',
  },
  description: {
    margin: '30px auto',
    fontSize: '0.8em',
    color: '#7D7C7C',
  },
  button: {
    margin: '0 auto 30px',
  },
  siteHeading: {
    // marginBottom: "60px",
    overflow: "hidden",
    marginTop: "3%",
  },
  siteHeadingH2: {
    display: "block",
    fontWeight: 700,
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  siteHeadingSpan: {
    color: "#6e11e4",
  },
  siteHeadingH4: {
    display: "inline-block",
    paddingBottom: "20px",
    position: "relative",
    textTransform: "capitalize",
    zIndex: 1,
  },
  siteHeadingH4Before: {
    background: "#6e11e4",
    bottom: 0,
    content: '""',
    height: "2px",
    left: "50%",
    marginLeft: "-25px",
    position: "absolute",
    width: "50px",
  },
}));

const PricingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ textAlign: "center" }} className={classes.siteHeading}>
        <Typography variant="h2" className={classes.siteHeadingH2}>
          Our <span className={classes.siteHeadingSpan}>Pricing</span>
        </Typography>
        <Typography variant="h4" className={classes.siteHeadingH4}>
          Checkout our premium memberships
          <span className={classes.siteHeadingH4Before}></span>
        </Typography>
      </Box>
      <Container className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={12}>
            <Box className={`${classes.box}`}>
              <Typography variant="h4" className={`${classes.title}`}>
                Basic
              </Typography>
              <Box className={classes.view}>
                <Box className={classes.icon}>
                  <img src="https://i.postimg.cc/2jcfMcf4/hot-air-balloon.png" alt="hot-air-balloon" className={classes.iconImg} />
                </Box>
                <Box className={classes.cost}>
                  <Typography variant="h3" className={classes.amount}>
                    FREE
                  </Typography>
                  <Typography variant="body1" className={classes.detail}>
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.description}>
                <List>
                  {['20 Employees', 'Free Training', 'Employee Schedule'].map((text, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <img src="https://i.postimg.cc/ht7g996V/check.png" alt="check" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ textAlign: "center" }} className={classes.button}>
                <Button variant="contained" color="primary">
                  Start Free
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <Box className={`${classes.box}`}>
              <Typography variant="h4" className={`${classes.title}`}>
                Small Businesses
              </Typography>
              <Box className={classes.view}>
                <Box className={classes.icon}>
                  <img src="https://i.postimg.cc/2jcfMcf4/hot-air-balloon.png" alt="hot-air-balloon" className={classes.iconImg} />
                </Box>
                <Box className={classes.cost}>
                  <Typography variant="h3" className={classes.amount} >
                    $49.99
                  </Typography>
                  <Typography variant="body1" className={classes.detail}>
                    /month
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.description}>
                <List>
                  {['All Basic Futures', '100 Employees', 'Payroll / Payout'].map((text, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <img src="https://i.postimg.cc/ht7g996V/check.png" alt="check" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ textAlign: "center" }} className={classes.button}>
                <Button variant="contained" color="primary">
                  Get it now
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <Box className={`${classes.box}`}>
              <Typography variant="h4" className={`${classes.title}`}>
                Enterprise
              </Typography>
              <Box className={classes.view}>
                <Box className={classes.icon}>
                  <img src="https://i.postimg.cc/2jcfMcf4/hot-air-balloon.png" alt="hot-air-balloon" className={classes.iconImg} />
                </Box>
                <Box className={classes.cost}>
                  <Typography variant="h3" className={classes.amount}>
                    $199.99
                  </Typography>
                  <Typography variant="body1" className={classes.detail}>

                  </Typography>
                </Box>
              </Box>
              <Box className={classes.description}>
                <List>
                  {['All Basic Features', 'Unlimited Employees', '24*7 Customer Support'].map((text, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <img src="https://i.postimg.cc/ht7g996V/check.png" alt="check" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ textAlign: "center" }} className={classes.button}>
                <Button variant="contained" color="primary">
                  get it now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PricingPage;
