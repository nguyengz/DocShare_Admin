import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';

import Table from './table/TableFiles';
import axios from '../../../node_modules/axios/index';
import authHeader from 'store/reducers/services/auth-header';

function AllFiles() {
  const [listAllFiles, setlistAllFiles] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/file/ListFiles/Admin`, { headers: authHeader() })
      .then((response) => {
        // Handle successful response
        setlistAllFiles(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);

  return (
    <>
      <Box sx={{ minHeight: '1000px', margin: '1px' }}>
        <Grid
          xs={12}
          sm={12}
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          //   alignContent="center"
          wrap="nowrap"
          margin="10px auto"
        >
          <Table data={listAllFiles} />
        </Grid>
      </Box>
    </>
  );
}
export default AllFiles;
