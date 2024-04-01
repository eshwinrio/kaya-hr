import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';


const useStyles = makeStyles(() => ({
  section: {
    display: 'flex',
    textAlign: 'center',
    position: 'relative',
    marginTop: '50px',
    justifyContent:'space-around',
    flexWrap:'wrap'
  },
  item: {
    border: '1px solid black',
    padding: '50px 40px',
    backgroundColor: '#ffffff',
    marginTop:'50px',
    marginBottom: '1.25rem',
    maxWidth: '270px',
    height: '20rem',
    borderRadius: '0.5rem',
    color: "black",
    position: 'relative',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.1), 0px 10px 10px 0 rgba(0, 0, 0, 0.1)',

  },
  title: {
    fontSize: '22px',
    fontWeight: 600,
    margin: 0,
    color: '#0e224a',
    marginTop: '1rem',
  },
  text: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
    padding: '5px',
    marginTop: '10px',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5rem',
    width: '5rem',
    borderRadius: '50%',
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    overflowX: 'visible',
  },
  vector: {
    width: '2.5rem',
    position: 'relative',
    top: '1.25rem',
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
  }
}));

const ContactUsPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ textAlign: "center" }} className={classes.siteHeading}>
        <Typography variant="h2" className={classes.siteHeadingH2}>
          Contact <span className={classes.siteHeadingSpan}>Kaya</span>
        </Typography>
        <Typography variant="h4" className={classes.siteHeadingH4}>
          We are here to help
          <span className={classes.siteHeadingH4Before}></span>
        </Typography>
      </Box>

      <Container>

        <div className={classes.section}>
          <div className={classes.item}>
            <div className={classes.icon} style={{ backgroundColor: '#ccacf7' }}>
              <CallIcon></CallIcon>
            </div>
            <Typography variant="h4" className={classes.title}>Call Us</Typography>
            <Typography variant="body1" className={classes.text}>For inquiries or assistance, We'll be happy to provide you with information and support tailored to your needs.</Typography>
            <a style={{ textDecoration: "underline", fontWeight: "bold" }} href={`tel:+19898989898`}>+1(230) 987 8765</a>
          </div>

          <div className={classes.item}>
            <div className={classes.icon} style={{ backgroundColor: '#ccacf7' }}>
              <EmailIcon>

              </EmailIcon>
            </div>
            <Typography variant="h4" className={classes.title}>Ask a Question</Typography>
            <Typography variant="body1" className={classes.text}>For inquiries or assistance, We'll be happy to provide you with information and support tailored to your needs.</Typography>
            <a style={{ textDecoration: "underline", fontWeight: "bold" }} href="mailto:kaya@example.com">kaya@example.com</a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactUsPage;
