import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deadManSwitch: false,
  contacts: [
    { name: 'Alice', phone: '+1 (555) 123-4567' },
    { name: 'Bob', phone: '+1 (555) 987-6543' },
  ],
};

const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    toggleDeadManSwitch: (state) => {
      state.deadManSwitch = !state.deadManSwitch;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.name !== action.payload);
    },
    updateContact: (state, action) => {
      const index = state.contacts.findIndex((contact) => contact.name === action.payload.name);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
  },
});

export const { toggleDeadManSwitch, addContact, removeContact, updateContact } = emergencySlice.actions;

export default emergencySlice.reducer;
