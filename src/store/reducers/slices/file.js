import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fileService from '../services/file.service';
import { setMessage } from './message';
import Swal from 'sweetalert2';

export const fetchFileDetail = createAsyncThunk('file/fetchFileDetail', async (data, thunkAPI) => {
  const response = await fileService.fetchFileDetail(data);
  thunkAPI.dispatch(setMessage(response.data.message));
  return response.data;
});
export const deletedFile = createAsyncThunk('file/deletedFile', async (dataDelete, thunkAPI) => {
  try {
    const startTime = performance.now();
    const response = await fileService.deletedFile(dataDelete);
    const endTime = performance.now(); // Lấy thời gian kết thúc request
    const requestTime = endTime - startTime;
    // thunkAPI.dispatch(setRequestTime(requestTime));
    thunkAPI.dispatch(setMessage(response.data));
    Swal.fire({
      icon: 'success',
      title: response.data.message,
      timer: requestTime > 2000 ? requestTime : 2000
      // showConfirmButton: false
    });
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Error when delete file';
    // const jsonObject = JSON.parse(message.substring(message.indexOf('{')));
    // const errorMessage = jsonObject.message;
    // const jsonString = JSON.stringify(message);
    // const errorObject = JSON.parse(jsonString);
    // const errorMessage = errorObject.message;

    thunkAPI.dispatch(setMessage(message));
    Swal.fire({
      icon: 'error',
      title: message === 'No message available' ? 'Error when delete file' : message,
      timer: 3000
    });
  }
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
