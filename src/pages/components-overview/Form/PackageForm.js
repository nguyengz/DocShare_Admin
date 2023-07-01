import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updatePackage } from 'store/reducers/slices/package';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
    const data = {
      id: initialTier.id,
      name: values.name,
      duration: values.duration,
      price: values.price,
      dowloads: values.dowloads,
      storageSize: values.cloud
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
  };

  return (
    <>
      <Formik
        initialValues={{
          name: initialTier.name,
          duration: initialTier.duration,
          price: initialTier.price,
          dowloads: initialTier.dowloads,
          cloud: initialTier.storageSize
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          duration: Yup.string().required('Description is required'),
          price: Yup.number().required('Price is required').positive('Price must be a positive number'),
          dowloads: Yup.number()
            .required('Download is required')
            .positive('Download must be a positive number')
            .integer('Download must be an integer'),
          cloud: Yup.number()
            .required('Cloud size is required')
            .positive('Cloud size must be a positive number')
            .integer('Cloud size must be an integer')
        })}
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
                    />
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
