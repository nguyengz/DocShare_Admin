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
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/index';

const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat()
});
const { dispatch } = store;
export { store, dispatch };
