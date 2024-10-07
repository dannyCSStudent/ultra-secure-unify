import { createSlice } from '@reduxjs/toolkit';

interface CallState {
  isMuted: boolean;
  isSpeakerOn: boolean;
  isVideoOn: boolean;
  isVerified: boolean;
}

const initialState: CallState = {
  isMuted: false,
  isSpeakerOn: false,
  isVideoOn: true,
  isVerified: false,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    toggleSpeaker: (state) => {
      state.isSpeakerOn = !state.isSpeakerOn;
    },
    toggleVideo: (state) => {
      state.isVideoOn = !state.isVideoOn;
    },
    verifyCall: (state) => {
      state.isVerified = true;
    },
  },
});

export const { toggleMute, toggleSpeaker, toggleVideo, verifyCall } = callSlice.actions;
export default callSlice.reducer;