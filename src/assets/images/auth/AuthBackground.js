import { Box } from '@mui/material';
import docshare from 'assets/images/logo/DOCSHARE.svg';
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <img src={docshare} alt="" />
    </Box>
  );
};

export default AuthBackground;
