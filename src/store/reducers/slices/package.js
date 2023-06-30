import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import packageService from '../services/package.service';
import { setMessage } from './message';
// Define the initial state

// Define an async thunk to fetch the packages

export const fetchPackages = createAsyncThunk('packages/fetchPackages', async () => {
  try {
    const response = await packageService.fetchPackageList();

    return response.data;
  } catch (error) {
    // return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const addPackage = createAsyncThunk('packages/addPackage', async (packageData, thunkAPI) => {
  try {
    const response = await packageService.addPackage(packageData);
    thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
// Define an async thunk to update the active status of a package
export const updatePackageActiveStatus = createAsyncThunk('packages/updatePackageActiveStatus', async ({ id }) => {
  try {
    const response = await packageService.putPackageActive(id);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

// Define the packages slice
const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    list: [],
    add: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state when fetching packages
      .addCase(fetchPackages.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when fetching packages
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      // Handle the rejected state when fetching packages
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPackage.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when fetching packages
      .addCase(addPackage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.add = action.payload;
      })
      // Handle the rejected state when fetching packages
      .addCase(addPackage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle the pending state when updating package active status
      .addCase(updatePackageActiveStatus.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when updating package active status
      .addCase(updatePackageActiveStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find the updated package in the list and update its active property
        const updatedPackage = action.payload;
        const index = state.list.findIndex((pkg) => pkg.id === updatedPackage.id);
        state.list[index].active = updatedPackage.active;
      })
      // Handle the rejected state when updating package active status
      .addCase(updatePackageActiveStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

const { reducer } = packagesSlice;
export default reducer;
