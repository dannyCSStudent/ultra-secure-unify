import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  name: string;
  trustScore: number;
  verified: boolean;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [
    { name: 'Alice', trustScore: 95, verified: true },
    { name: 'Bob', trustScore: 88, verified: true },
    { name: 'Charlie', trustScore: 60, verified: false },
  ],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    verifyContact: (state, action: PayloadAction<string>) => {
      const contact = state.contacts.find(c => c.name === action.payload);
      if (contact) {
        contact.verified = true;
      }
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(c => c.name !== action.payload);
    },
  },
});

export const { addContact, verifyContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;
