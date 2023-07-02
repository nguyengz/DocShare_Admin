// third-party
// import { configureStore } from '@reduxjs/toolkit';

// // project import
// import reducers from './reducers';

// // ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

// const store = configureStore({
//   reducer: reducers
// });

// const { dispatch } = store;

// export { store, dispatch };
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const middleware = [...getDefaultMiddleware(), thunk];

const store = configureStore({
  reducer: reducers,
  middleware
});
const { dispatch } = store;
export { store, dispatch };
