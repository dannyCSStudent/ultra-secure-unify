import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import securityReducer from './slices/securitySlice';
import callReducer from './slices/callSlice';
import privacyReducer from './slices/privacySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    security: securityReducer,
    call: callReducer,
    privacy: privacyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;