import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fileService from '../services/file.service';
import { setMessage } from './message';

export const fetchFileDetail = createAsyncThunk('file/fetchFileDetail', async (data, thunkAPI) => {
  const response = await fileService.fetchFileDetail(data);
  thunkAPI.dispatch(setMessage(response.data.message));
  return response.data;
});
export const deletedFile = createAsyncThunk('file/deletedFile', async (data, thunkAPI) => {
  const response = await fileService.deletedFile(data);
  thunkAPI.dispatch(setMessage(response.data.message));
  return response.data;
});
const fileSlice = createSlice({
  name: 'file',
  initialState: {
    data: [],
    detailList: [],
    status: 'no',
    error: null,
    successMessage: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFileDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.detailList = action.payload;
      })
      .addCase(fetchFileDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletedFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletedFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(deletedFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default fileSlice.reducer;
