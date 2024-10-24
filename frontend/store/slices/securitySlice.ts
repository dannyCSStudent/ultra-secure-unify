import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProofData {
  proof: string;
  publicSignals: string;
}

interface SecurityState {
  masterPassword: string | null;
  enableBiometric: boolean;
  phoneNumber: string | null;
  proofData: ProofData | null;  // Updated to handle object instead of just a string
}

const initialState: SecurityState = {
  masterPassword: null,
  enableBiometric: false,
  phoneNumber: null,
  proofData: null,  // Updated to initialize as null
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
    setProofData: (state, action: PayloadAction<ProofData>) => {  // Updated to handle proofData
      state.proofData = action.payload;
    },
  },
});

export const { setMasterPassword, toggleBiometricLogin, setPhoneNumber, setProofData } = securitySlice.actions;
export default securitySlice.reducer;
