// import {configureStore} from '@reduxjs/toolkit';
// import authReducers from './Component/AuthContext';

// const store = configureStore({
// 	reducer:{
// 		auth: authReducers,
// 	}
// })

// export default store;




import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Component/AuthContext';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const authReducers = persistReducer(persistConfig, authReducer);
const store = configureStore({
	reducer:{
		auth: authReducers,
	},
	middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
});


export const persistor = persistStore(store);
export default store;