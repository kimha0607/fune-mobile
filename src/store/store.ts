import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { errorReducer } from './slices/error';
import { userReducer } from './slices/user';
import { childrenReducer } from './slices/children';

const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    childrenReducer,
    errorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
