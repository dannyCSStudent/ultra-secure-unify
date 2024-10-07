// privacySlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface PrivacyState {
  privacyShield: boolean;
}

const initialState: PrivacyState = {
  privacyShield: true,
};

const privacySlice = createSlice({
  name: 'privacy',
  initialState,
  reducers: {
    togglePrivacyShield: (state) => {
      state.privacyShield = !state.privacyShield;
    },
  },
});

export const { togglePrivacyShield } = privacySlice.actions;
export default privacySlice.reducer;
