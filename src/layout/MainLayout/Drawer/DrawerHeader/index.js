import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import docshare from 'assets/images/logo/docshare1.svg';
// import Logo from 'components/Logo';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* <Logo /> */}
        <img
          src={docshare}
          alt=""
          style={{
            width: '20%',
            height: '20%',
            margin: 'auto 0',
            '@media (max-width: 600px)': {
              width: '10%',
              height: '10%'
            }
          }}
        />
        <Typography variant="h3" color="#0898de" sx={{ fontFamily: 'SVN-Avengeance', margin: 'auto 0' }}>
          DOCSHARE
        </Typography>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
