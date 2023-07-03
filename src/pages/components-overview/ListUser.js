import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';

import Table from './table/TableUser';
import { fetchUser } from 'store/reducers/slices/user';

function ListUser() {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUser);

  useEffect(() => {
    dispatch(fetchUser());
    // console.log(listUsers);
  }, [dispatch]);

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
          <Table data={listUsers} />
        </Grid>
      </Box>
    </>
  );
}

export default ListUser;
