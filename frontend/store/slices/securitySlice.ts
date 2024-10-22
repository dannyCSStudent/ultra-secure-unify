import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SecurityState {
  masterPassword: string | null;
  enableBiometric: boolean;
  phoneNumber: string | null;
  proof: string | null;
}

const initialState: SecurityState = {
  masterPassword: null,
  enableBiometric: false,
  phoneNumber: null,
  proof: null,
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
    setProof : (state, action: PayloadAction<string>) => {
      state.proof = action.payload;
    },
  },
});

export const { setMasterPassword, toggleBiometricLogin, setPhoneNumber, setProof } = securitySlice.actions;
export default securitySlice.reducer;
