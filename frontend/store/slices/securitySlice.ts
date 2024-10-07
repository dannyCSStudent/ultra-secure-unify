import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SecurityState {
  masterPassword: string | null;
  enableBiometric: boolean;
  phoneNumber: string | null;
}

const initialState: SecurityState = {
  masterPassword: null,
  enableBiometric: false,
  phoneNumber: null,
};

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    setMasterPassword: (state, action: PayloadAction<string>) => {
      state.masterPassword = action.payload;
    },
    toggleBiometricLogin: (state, action: PayloadAction<boolean>) => {
      state.enableBiometric = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setMasterPassword, toggleBiometricLogin, setPhoneNumber } = securitySlice.actions;
export default securitySlice.reducer;
