import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from '../services/user.service';

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
    }
  }
});

const { reducer } = userSlice;
export default reducer;
