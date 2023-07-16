import React from 'react';
import { Grid, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPackage } from 'store/reducers/slices/package';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
const PackageFormAdd = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      name: values.name,
      duration: values.duration,
      price: values.chargedPerUpload ? 0 : values.price,
      dowloads: values.dowloads,
      storageSize: values.cloud,
      type: values.chargedPerUpload
    };

    try {
      console.log(data);
      await dispatch(addPackage(data));
      // Update the state with the updated package data
      // setInitialTier(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        duration: '',
        price: '',
        dowloads: '',
        cloud: '',
        chargedPerUpload: false
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        duration: Yup.number()
          .min(0, 'Download must be at least 0')
          .required('Download is required')
          .positive('Download must be a positive number')
          .integer('Download must be an integer'),
        price: Yup.number().when('chargedPerUpload', {
          is: true,
          then: Yup.number().equals([0], 'Price must be 0 when charged per upload'),
          otherwise: Yup.number().required('Price is required').moreThan(-1, 'Price must be a positive number or 0')
        }),
        dowloads: Yup.number()
          .min(0, 'Download must be a non-negative integer')
          .required('Download is required')
          .test('is-integer', 'Download must be an integer', (value) => Number.isInteger(value)),
        cloud: Yup.number()
          .min(0, 'Download must be at least 0')
          .max(50, 'Download must be at most 50')
          .required('Cloud size is required')
          .positive('Cloud size must be a positive number')
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                  value={values.chargedPerUpload ? 0 : values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                  sx={{ width: '200px' }}
                  disabled={values.chargedPerUpload}
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
                  inputProps={{ min: 0, max: 50 }}
                  sx={{ width: '200px' }}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox checked={values.chargedPerUpload} onChange={handleChange} name="chargedPerUpload" />}
                  label="Charged per upload"
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PackageFormAdd;
