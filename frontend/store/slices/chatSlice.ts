import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  activeChat: string | null;
}

const initialState: ChatState = {
  messages: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.activeChat = null;
    },
  },
});

export const { addMessage, setActiveChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;