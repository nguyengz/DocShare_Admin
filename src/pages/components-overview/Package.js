import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, Tooltip } from '@mui/material';
import axios from 'axios';
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
import { addPackage, fetchPackages } from 'store/reducers/slices/package';
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

// const tiers = [
//   {
//     tiers_id: 1,
//     title: 'Free',
//     price: '0',
//     description: ['10 downloads', '1 GB of storage'],

//     buttonVariant: 'outlined'
//   },
//   {
//     tiers_id: 2,
//     title: 'Pro',
//     subheader: 'Most popular',
//     price: '15',
//     description: ['20 downloads', '2 GB of storage'],

//     buttonVariant: 'contained'
//   },
//   {
//     tiers_id: 3,
//     title: 'Enterprise',
//     price: '30',
//     description: ['50 downloads', '5 GB of storage'],

//     buttonVariant: 'outlined'
//   }
// ];
function Package() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  //   const { user: currentUser } = useSelector((state) => state.auth);
  //   const [isUploading, setIsUploading] = useState(false);
  let tiers = useSelector((state) => state.packages.list);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [download, setDownload] = useState('');
  const [cloud, setCloud] = useState(0);
  const [showDetailsId, setShowDetailsId] = useState(null);
  // const [isActive, setIsActive] = useState();
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
  const handleSwitchChange = async () => {
    setShowDialog(true);
  };
  // const payLink = useSelector((state) => state.package.data);
  const handleResgisterPackage = (tier) => {
    setShowDetailsId(tier.tiers_id);
  };

  const handlClickThongKe = () => {
    setShowDetailsId(null);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDownloadChange = (event) => {
    setDownload(event.target.value);
  };

  const handleCouldChange = (event) => {
    setCloud(event.target.value);
  };
  const handleSubmit = () => {
    alert('Thanh cong');
  };
  const handleAddPackage = () => {
    setShowForm(true); // show the form when the button is clicked
  };
  const handleClosePackage = () => {
    setShowForm(false); // show the form when the button is clicked
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    dispatch(addPackage({ name, description, price, download, cloud }));
    setName('');
    setDescription('');
    setPrice(0);
    setDownload(0);
    setCloud(0); // TODO: submit the form data to the server and add the new package to the list
    // hide the form after submission
  };
  const handleDialogSubmit = async (id) => {
    try {
      const updatedPackage = { id };
      await axios.put(`http://localhost:8080/package/active`, updatedPackage);
      // setIsActive(!isActive);
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
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2} direction="row" sx={{ marginTop: '10px' }}>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      sx={{ marginBlockEnd: '10px' }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                  </Grid>
                  <Grid item>
                    <TextField label="Price" type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <TextField label="Download" type="number" value={download} onChange={(event) => setDownload(event.target.value)} />
                  </Grid>
                  <Grid item>
                    <TextField label="Cloud" type="number" value={cloud} onChange={(event) => setCloud(event.target.value)} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                  <Button variant="outlined" color="primary" sx={{ marginLeft: '10px' }} onClick={handleClosePackage}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        )}
      </Grid>
      {tiers?.map((tier) => (
        <>
          <Grid
            container
            key={tier.tiers_id}
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
                padding: '15px'
              }}
            >
              <CardHeader
                title={tier.name}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                action={tier.name === 'Pro' ? <StarIcon /> : null}
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
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <PricingList>
                  <Typography component="li" variant="subtitle1" align="center">
                    {tier.dowloads} Download
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    {tier.storageSize} GB storageSize
                  </Typography>
                </PricingList>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => (showDetailsId === tier.tiers_id ? handlClickThongKe() : handleResgisterPackage(tier))}
                >
                  {showDetailsId === tier.tiers_id ? 'Total' : 'Edit'}
                </Button>
              </CardActions>
            </PricingCard>
            {showDetailsId === tier.tiers_id ? (
              <Grid item xs={12} sm={9} ml={10}>
                <Typography variant="h3"> Edit</Typography>
                <form>
                  <Grid container spacing={2} direction="row" sx={{ marginTop: '10px' }}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <TextField label="Name" value={name} onChange={handleNameChange} sx={{ marginBlockEnd: '10px' }} />
                      </Grid>
                      <Grid item>
                        <TextField label="Description" value={description} onChange={handleDescriptionChange} />
                      </Grid>
                      <Grid item>
                        <TextField label="Price" type="number" value={price} onChange={handlePriceChange} />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <TextField label="Download" type="number" value={download} onChange={handleDownloadChange} />
                      </Grid>
                      <Grid item>
                        <TextField label="Could" type="number" value={cloud} onChange={handleCouldChange} />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                <Grid item>
                  <Tooltip arrow placement="right" title={tier.active ? 'Disable' : 'Enable'}>
                    <Switch defaultChecked={tier.active} onChange={handleSwitchChange} />
                    {tier.active ? 'Enable' : 'Disable'}
                  </Tooltip>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} sm={9} ml={10}>
                <Typography> Total: 12 user</Typography>
                <Typography> Oder: 12 Oder</Typography>
                <Typography> Sales: 12 sales</Typography>
              </Grid>
            )}
          </Grid>
          <Dialog open={showDialog} onClose={() => handleDialogClose(tier.id)}>
            <DialogTitle>{tier.active ? 'Disable' : 'Enable'} User</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to {tier.active ? 'disable' : 'enable'} the package?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={() => handleDialogSubmit(tier.id)} variant="contained">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ))}

      {/* </Grid> */}
    </Container>
  );
}
export default Package;
