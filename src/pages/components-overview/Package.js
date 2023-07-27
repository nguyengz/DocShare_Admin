import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, Tooltip } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPackages, putPackageActive } from 'store/reducers/slices/package';
import PackageForm from './Form/PackageForm';
import PackageFormAdd from './Form/PackageFormAdd';

// import { useDispatch, useSelector } from 'react-redux';
// import { registerPackage } from '~/slices/paypal';

const PricingList = styled('ul')({
  margin: 0,
  padding: 0,
  listStyle: 'none'
});
const PricingCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme && theme.palette && theme.palette.grey && theme.palette.grey[200] ? theme.palette.grey[200] : '#f5f5f5',
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: `0px 0px 15px 5px`
  }
}));

function Package() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  //   const { user: currentUser } = useSelector((state) => state.auth);
  //   const [isUploading, setIsUploading] = useState(false);
  const tiers = useSelector((state) => state.packages.list);

  const [showDetailsId, setShowDetailsId] = useState(false);
  const [isTier, setIsTier] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const handleDialogClose = () => {
    setShowDialog(false);
    // hide the dialog box
    // reset input value to initial value // reset switch value to initial value
  };
  const handleSwitchChange = async (tier) => {
    setIsTier(tier);
    setShowDialog(true);
  };
  // const payLink = useSelector((state) => state.package.data);
  const handleResgisterPackage = (tier) => {
    setShowDetailsId(true);
    setIsTier(tier.id);
  };

  const handlClickThongKe = (tier) => {
    setShowDetailsId(false);
    setIsTier(tier.id);
  };
  const handleAddPackage = () => {
    setShowForm(true); // show the form when the button is clicked
  };
  const handleClosePackage = () => {
    setShowForm(false); // show the form when the button is clicked
  };

  const handleDialogSubmit = async () => {
    const updatedPackage = { id: isTier.id, active: !isTier.active };
    try {
      dispatch(putPackageActive(updatedPackage));
      // await axios.put(`http://localhost:8080/package/active`, updatedPackage);
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="12" component="main" spacing={2}>
      <Grid ml={1} description="row">
        {' '}
        <Button variant="contained" color="primary" onClick={handleAddPackage}>
          Add Package
        </Button>
        {showForm && ( // display the form if the showForm state variable is true
          <Grid item xs={12} sm={8} ml={20} mt={-5}>
            <PackageFormAdd />
            <Button variant="outlined" color="primary" sx={{ marginLeft: '100px', marginTop: '-60px' }} onClick={handleClosePackage}>
              Close
            </Button>
          </Grid>
        )}
      </Grid>
      {tiers.map((tier) => (
        <>
          <Grid
            container
            key={tier?.tiers_id}
            xs={12}
            sm={12}
            spacing={2}
            sx={{
              border: '1px dashed #b4bbd1',
              margin: '5px',
              padding: '5px',
              backgroundColor: 'white'
            }}
          >
            <PricingCard
              sx={{
                width: '200px',
                padding: '15px',
                boxShadow: tier?.active ? '0 0 10px rgba(0, 255, 0, 0.5)' : '0 0 10px rgb(255 1 1)'
              }}
            >
              <CardHeader
                title={tier?.name}
                subheader={tier?.subheader}
                titleTypographyProps={{ align: 'center' }}
                action={tier?.name === 'Pro' ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: 'center'
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier?.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <PricingList>
                  <Typography component="li" variant="subtitle1" align="center">
                    {tier?.dowloads} Download
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    {tier?.storageSize > 1024 || tier?.storageSize === 1024 ? tier.storageSize / 1024 + ' GB' : tier?.storageSize + ' MB'}{' '}
                    storageSize
                  </Typography>
                </PricingList>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => (showDetailsId && isTier === tier?.id ? handlClickThongKe(tier) : handleResgisterPackage(tier))}
                >
                  {showDetailsId && isTier === tier?.id ? 'Total' : 'Edit'}
                </Button>
              </CardActions>
            </PricingCard>
            {showDetailsId && isTier === tier?.id ? (
              <Grid item xs={12} sm={9} ml={10}>
                <Typography variant="h3"> Edit</Typography>
                <PackageForm initialTier={tier} />
                <Grid item>
                  <Tooltip arrow placement="right" title={tier.active ? 'Disable' : 'Enable'}>
                    <Switch defaultChecked={tier?.active} onClick={() => handleSwitchChange(tier)} />
                    {tier?.active ? 'Enable' : 'Disable'}
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} sm={9} ml={10}>
                <Typography> TotalOder: {tier?.orderCount} TotalOder</Typography>
                <Typography> TotalSales: {tier?.sumOrder} TotalSales</Typography>
              </Grid>
            )}
            <Dialog open={showDialog} onClose={() => handleDialogClose(tier.id)}>
              <DialogTitle>{tier?.active ? 'Disable' : 'Enable'} User</DialogTitle>
              <DialogContent>
                <p>Are you sure you want to {tier?.active ? 'disable' : 'enable'} the package?</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={() => handleDialogSubmit(tier)} variant="contained">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </>
      ))}

      {/* </Grid> */}
    </Container>
  );
}
export default Package;
