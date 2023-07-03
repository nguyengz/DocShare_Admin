import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    const startTime = performance.now();
    const response = await userService.putUserActive(data);
    const endTime = performance.now();
    const requestTime = endTime - startTime;
    thunkAPI.dispatch(setRequestTime(requestTime));
    Swal.fire({
      icon: 'success',
      title: 'User status updated successfully',
      timer: 2000,
      showConfirmButton: false
    });
    const updatedUser = response.data;
    const updatedListUser = thunkAPI.getState().user.listUser.map((user) => {
      if (user.id === updatedUser.id) {
        return {
          ...user,
          enabled: !user.enabled
        };
      }
      return user;
    });
    thunkAPI.dispatch(updateListUser(updatedListUser));
    return updatedUser;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const setRequestTime = createAction('user/setRequestTime');
const userSlice = createSlice({
  name: 'user',
  initialState: {
    listUser: [],
    userAbout: null,
    status: 'idle',
    requestTime: null,
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
    [putUserActive.pending]: (state) => {
      state.status = 'loading';
    },
    [putUserActive.fulfilled]: (state, action) => {
      const updatedList = state.listUser.map((user) => (user.id === action.payload.id ? action.payload : user));
      state.listUser = updatedList;
      state.status = 'succeeded';
    },
    [putUserActive.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [setRequestTime.type]: (state, action) => {
      state.requestTime = action.payload;
    }
  }
});

const { reducer } = userSlice;
export default reducer;
