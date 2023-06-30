// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authReducer from './slices/auth';
import userReducer from './slices/user';
import fileReducer from './slices/file';
import packageReducer from './slices/package';
import messageReducer from './slices/message';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu: menu,
  auth: authReducer,
  message: messageReducer,
  user: userReducer,
  file: fileReducer,
  packages: packageReducer
});

export default reducers;
