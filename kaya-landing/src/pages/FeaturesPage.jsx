import AcUnitIcon from '@mui/icons-material/AcUnit';
import GroupsIcon from "@mui/icons-material/Groups";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { alpha } from '@mui/material/styles';
import GraphicText from '../components/GraphicText';
import { useMaterialTheme } from '../lib/material-theme';

function FeaturesPage() {
  const theme = useMaterialTheme();
  return (
    <>
      <Box sx={{
        textAlign: "center",
        py: 16,
        background: `linear-gradient(
          0deg,
          ${alpha(theme.palette.primary.main, 0.0)} 0%,
          ${alpha(theme.palette.grey[300], 0.6)} 50%,
          ${alpha(theme.palette.primary.main, 0.0)} 100%
        )`,
      }}>
        <Container>
          <Typography variant="h2" fontWeight={700} style={{ marginBottom: "10px" }}>
            <GraphicText>Features</GraphicText>
          </Typography>
          <Typography variant="h4">Checkout our latest features</Typography>
        </Container>
      </Box>

      <Container>
        <Grid2 container spacing={4}>
          <Grid2 sx={{ textAlign: "center" }} item xs={12} md={12}>
            <Box sx={{
              padding: "15px 30px",
            }}>
              <Box sx={{
                marginBottom: "20px",
              }}>
                <GroupsIcon sx={{ fontSize: "100px" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontSize: "20px",
                }}>
                  Employee Information Management
                </Typography>
                <Typography variant="body1">
                  This includes storing and managing employee data such as
                  personal details, contact information, employment history,
                  skills, qualifications, and performance records.
                </Typography>
              </Box>
            </Box>
          </Grid2>
          <Grid2 sx={{ textAlign: "center" }} item xs={12} md={12}>
            <Box sx={{
              padding: "15px 30px",
            }}>
              <Box sx={{
                marginBottom: "20px",
              }}>
                <LocalAtmIcon sx={{ fontSize: "100px" }} />
                <AcUnitIcon />
              </Box>
              <Box>
                <Typography variant="h4" sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontSize: "20px",
                }}>
                  Payroll Management
                </Typography>
                <Typography variant="body1">
                  This function involves processing employee salaries, wages,
                  bonuses, deductions, and taxes. It may also generate pay
                  slips and handle direct deposits.
                </Typography>
              </Box>
            </Box>
          </Grid2>
          <Grid2 sx={{ textAlign: "center" }} item xs={12} md={12}>
            <Box sx={{
              padding: "15px 30px",
            }}>
              <Box sx={{
                marginBottom: "20px",
              }}>
                <GroupsIcon sx={{ fontSize: "100px" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontSize: "20px",
                }}>
                  Time and Attendance Tracking
                </Typography>
                <Typography variant="body1">
                  This feature allows employees to log their working hours,
                  track attendance, manage leave requests, and monitor overtime.
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default FeaturesPage;
