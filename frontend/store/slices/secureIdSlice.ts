import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SecureIdState {
  isGenerating: boolean;
  generated: boolean;
  error: string | null;
}

const initialState: SecureIdState = {
  isGenerating: false,
  generated: false,
  error: null,
};

const secureIdSlice = createSlice({
  name: 'secureId',
  initialState,
  reducers: {
    startGeneration(state) {
      state.isGenerating = true;
      state.generated = false;
      state.error = null;
    },
    completeGeneration(state) {
      state.isGenerating = false;
      state.generated = true;
    },
    failGeneration(state, action: PayloadAction<string>) {
      state.isGenerating = false;
      state.error = action.payload;
    },
  },
});

export const { startGeneration, completeGeneration, failGeneration } = secureIdSlice.actions;

export default secureIdSlice.reducer;
