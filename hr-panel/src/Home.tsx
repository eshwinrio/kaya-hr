import { LoaderFunction, useLoaderData } from 'react-router-dom'
import logo from './assets/logo-full.svg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { verifyIdentity } from './lib/fetch-requests';

export default function Home() {
  const loaderData = useLoaderData() as {
    firstName: string
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: 16 }}>
      <img src={logo} alt="logo" width={192} />
      <Typography variant='subtitle1' sx={{ mt: 2 }}>
        Hello {loaderData.firstName}. It's great to see you!
      </Typography>
    </Box>
  );
}

export const homeLoader: LoaderFunction = async () => {
  try {
    const response = await verifyIdentity();
    const json = await response.json()
    return json;
  } catch (e) {
    throw e;
  }
}