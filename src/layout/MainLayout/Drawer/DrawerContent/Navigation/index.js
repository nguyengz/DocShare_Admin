import { Box, Typography } from '@mui/material';
import NavGroup from './NavGroup';
import dashboard from 'menu-items/dashboard';
import { useSelector } from 'react-redux';
import menuItems from 'menu-items';

const Navigation = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const navGroups = currentUser
    ? menuItems.items.map((item) => {
        switch (item.type) {
          case 'group':
            return <NavGroup key={item.id} item={item} />;
          default:
            return (
              <Typography key={item.id} variant="h6" color="error" align="center">
                Fix - Navigation Group
              </Typography>
            );
        }
      })
    : [<NavGroup key={dashboard.id} item={dashboard} />];

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
