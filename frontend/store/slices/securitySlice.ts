import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SecurityState {
  masterPassword: string | null;
  enableBiometric: boolean;
  phoneNumber: string | null;
  proof: string | null;
  publicSignals: string | null; // New property for publicSignals
}

const initialState: SecurityState = {
  masterPassword: null,
  enableBiometric: false,
  phoneNumber: null,
  proof: null,
  publicSignals: null, // Initialize publicSignals in the state
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
    setProof: (state, action: PayloadAction<string>) => {
      state.proof = action.payload;
    },
    setPublicSignals: (state, action: PayloadAction<string>) => { // New reducer for publicSignals
      state.publicSignals = action.payload;
    },
  },
});

export const { setMasterPassword, toggleBiometricLogin, setPhoneNumber, setProof, setPublicSignals } = securitySlice.actions;
export default securitySlice.reducer;
