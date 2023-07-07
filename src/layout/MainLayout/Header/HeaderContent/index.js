// material-ui
import { Box, useMediaQuery, Button } from '@mui/material';

// project import
import Search from './Search';
import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';
import { useSelector } from 'react-redux';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      {currentUser ? (
        <Profile />
      ) : (
        <Button variant="outlined" sx={{ m: '10px', width: '100px' }} href={'/login'}>
          Sign in
        </Button>
      )}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
