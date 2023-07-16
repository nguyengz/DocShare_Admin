import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updatePackage } from 'store/reducers/slices/package';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
const PackageForm = ({ initialTier }) => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogClose = () => {
    setShowDialog(false);
    // hide the dialog box
    // reset input value to initial value // reset switch value to initial value
  };
  const handleDialogOpen = () => {
    setShowDialog(true);
    // hide the dialog box
    // reset input value to initial value // reset switch value to initial value
  };

  const handleSubmit = async (values) => {
    if (values.duration < 0 || values.price < 0 || values.dowloads < 0 || values.cloud < 0) {
      let err = '';
      if (values.duration < 0) {
        err += 'Duration must be a positive number or 0\n';
      }
      if (values.price < 0) {
        err += 'Price must be a positive number or 0\n';
      }
      if (values.dowloads < 0) {
        err += 'Download must be a positive number or 0\n';
      }
      if (values.cloud < 0) {
        err += 'Cloud size must be a positive number or 0\n';
      }
      if (err !== '') {
        Swal.fire({
          icon: 'error',
          title: err,
          timer: 2000
        });
      }
      setShowDialog(false);
    } else {
      const data = {
        id: initialTier.id,
        name: values.name,
        duration: values.duration,
        price: values.price,
        dowloads: values.dowloads,
        storageSize: values.cloud,
        type: values.chargedPerUpload
      };
      console.log(data);
      try {
        await dispatch(updatePackage(data));
        setShowDialog(false);
        // Update the state with the updated package data
        // setInitialTier(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: initialTier.name,
          duration: initialTier.duration,
          price: initialTier.price,
          dowloads: initialTier.dowloads,
          cloud: initialTier.storageSize,
          chargedPerUpload: initialTier?.type === 2 ? true : false
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          duration: Yup.string().required('Description is required'),
          price: Yup.number().when('chargedPerUpload', {
            is: true,
            then: Yup.number().equals([0], 'Price must be 0 when charged per upload'),
            otherwise: Yup.number().required('Price is required').moreThan(-1, 'Price must be a positive number or 0')
          }),
          dowloads: Yup.number()
            .required('Download is required')
            .positive('Download must be a positive number')
            .moreThan(-1, 'Price must be a positive number or 0')
            .integer('Download must be an integer'),
          cloud: Yup.number()
            .required('Cloud size is required')
            .positive('Cloud size must be a positive number')
            .integer('Cloud size must be an integer')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
          <>
            <Form>
              <Grid container spacing={2} direction="row" sx={{ marginTop: '10px' }}>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <TextField
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{ marginBlockEnd: '30px', width: '200px' }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Description"
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.duration && errors.duration)}
                      helperText={touched.duration && errors.duration}
                      sx={{ width: '200px' }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Price"
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                      sx={{ width: '200px' }}
                      disabled={initialTier?.type === 2 ? true : false}
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <TextField
                      label="Download"
                      type="number"
                      name="dowloads"
                      value={values.dowloads}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.dowloads && errors.dowloads)}
                      helperText={touched.dowloads && errors.dowloads}
                      inputProps={{ min: 0, max: 50 }}
                      sx={{ width: '200px' }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Cloud"
                      type="number"
                      name="cloud"
                      value={values.cloud}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.cloud && errors.cloud)}
                      helperText={touched.cloud && errors.cloud}
                      sx={{ width: '200px' }}
                      inputProps={{ min: 0, max: 50 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="caption" color="initial">
                      {initialTier?.type === 2 ? 'Type: Charged per upload' : initialTier?.type === 1 ? 'Type: Limit' : 'Type: Unlimit'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleDialogOpen} disabled={isSubmitting}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
            <Dialog open={showDialog} onClose={() => handleDialogClose(tier.id)}>
              <DialogTitle>Update package</DialogTitle>
              <DialogContent>
                <p>Are you sure you want Update to the package?</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={() => handleSubmit(values)} variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Formik>
    </>
  );
};

export default PackageForm;
