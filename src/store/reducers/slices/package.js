import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import packageService from '../services/package.service';
import { setMessage } from './message';
import Swal from 'sweetalert2';
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

    // set success message
    thunkAPI.dispatch(setMessage({ text: 'Package added successfully!', success: true }));
    Swal.fire({
      icon: 'success',
      title: 'Package added successfully',
      timer: 2000,
      showConfirmButton: false
    });
    return response.data;
  } catch (error) {
    // set error message
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage({ message, success: false }));
    Swal.fire({
      icon: 'error',
      title: message,
      timer: 2000,
      showConfirmButton: false
    });
    return thunkAPI.rejectWithValue();
  }
});
// Define an async thunk to update the active status of a package
export const putPackageActive = createAsyncThunk('packages/putPackageActive', async (updatedPackage, thunkAPI) => {
  try {
    const response = await packageService.putPackageActive(updatedPackage);
    Swal.fire({
      icon: 'success',
      title: 'Package status updated successfully',
      timer: 2000,
      showConfirmButton: false
    });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    Swal.fire({
      icon: 'error',
      title: message,
      timer: 2000,
      showConfirmButton: false
    });
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const updatePackage = createAsyncThunk('packages/updatePackage', async (updatedPackage, thunkAPI) => {
  try {
    const response = await packageService.updatePackage(updatedPackage);
    Swal.fire({
      icon: 'success',
      title: 'Package updated successfully',
      timer: 2000,
      showConfirmButton: false
    });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    Swal.fire({
      icon: 'error',
      title: message,
      timer: 2000,
      showConfirmButton: false
    });
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
        state.list.push(action.payload);
      })
      // Handle the rejected state when fetching packages
      .addCase(addPackage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle the pending state when updating package active status
      .addCase(putPackageActive.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when updating package active status
      .addCase(putPackageActive.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.map((pkg) => (pkg.id === action.payload.id ? action.payload : pkg));
      })
      // Handle the rejected state when updating package active status
      .addCase(putPackageActive.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePackage.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the fulfilled state when updating package
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.map((pkg) => (pkg.id === action.payload.id ? action.payload : pkg));
      })
      // Handle the rejected state when updating package
      .addCase(updatePackage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

const { reducer } = packagesSlice;
export default reducer;
