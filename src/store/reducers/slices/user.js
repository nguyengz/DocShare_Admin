import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from '../services/user.service';
import { setMessage } from './message';
import Swal from 'sweetalert2';

export const fetchUser = createAsyncThunk('user/fetchUser', async (thunkAPI) => {
  try {
    const response = await userService.fetchUser();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const fetchUserAbout = createAsyncThunk('user/fetchUserAbout', async (userId, thunkAPI) => {
  try {
    const response = await userService.fetchUserAbout(userId);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const putUserActive = createAsyncThunk('user/putUserActive', async (data, thunkAPI) => {
  try {
    const response = await userService.putUserActive(data);
    Swal.fire({
      icon: 'success',
      title: 'User status updated successfully',
      timer: 2000,
      showConfirmButton: false
    });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    listUser: [],
    userAbout: null,
    status: 'sidle',
    error: null
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.listUser = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchUserAbout.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUserAbout.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userAbout = action.payload;
    },
    [fetchUserAbout.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    // Add a closing bracket here
    [putUserActive.pending]: (state) => {
      state.status = 'loading';
    },
    // Handle the fulfilled state when updating package active status
    [putUserActive.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.listUser = state.listUser.map((user) => (user.id === action.payload.id ? action.payload : user));
    },
    // Handle the rejected state when updating package active status
    [putUserActive.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

const { reducer } = userSlice;
export default reducer;
