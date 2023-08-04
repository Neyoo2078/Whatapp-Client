import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChat: null,
  ChatMessages: [],
  Socketinfo: null,
  Event: false,
  handleEmojiModal: false,
  ReducerSesiion: null,
  Search: false,
  videoCall: undefined,
  voiceCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
  OngoingVoiceCall: undefined,
  OngoingVideoCall: undefined,
  onlineUsers: undefined,
};
const chatReducer = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    currentUser(state, actions) {
      state.currentChat = actions.payload;
    },
    ChatMessage(state, action) {
      state.ChatMessages = action.payload;
    },
    UpdateChatMessage(state, action) {
      state.ChatMessages = [...state.ChatMessages, action.payload];
    },
    SocketReducer(state, action) {
      state.Socketinfo = action.payload;
    },
    SocketEvent(state, action) {
      state.Event = action.payload;
    },
    HandleEmojiModal(state, action) {
      state.handleEmojiModal = action.payload;
    },
    ReducerSesiion(state, action) {
      state.ReducerSesiion = action.payload;
    },
    SearchMessages(state, action) {
      state.Search = action.payload;
    },
    SetVideoCall(state, action) {
      state.videoCall = action.payload;
    },
    SetVoiceCall(state, action) {
      state.voiceCall = action.payload;
    },
    SetIncomingVoiceCall(state, action) {
      state.incomingVoiceCall = action.payload;
    },
    SetIncomingVideoCall(state, action) {
      state.incomingVideoCall = action.payload;
    },
    EndCall(state, action) {
      state.videoCall = undefined;
      state.voiceCall = undefined;
      state.incomingVoiceCall = undefined;
      state.incomingVideoCall = undefined;
      state.OngoingVoiceCall = undefined;
      state.OngoingVideoCall = undefined;
    },
    SetOngoingVoiceCall(state, action) {
      state.OngoingVoiceCall = action.payload;
    },
    SetOngoingVideoCall(state, action) {
      state.OngoingVideoCall = action.payload;
    },
    updateVoiceCall(state, action) {
      state.voiceCall = { ...state.voiceCall, callType: 'on_going' };
    },
    updateVideoCall(state, action) {
      state.videoCall = { ...state.videoCall, callType: 'on_going' };
    },
    setonlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  currentUser,
  ChatMessage,
  UpdateChatMessage,
  SocketReducer,
  SocketEvent,
  HandleEmojiModal,
  ReducerSesiion,
  SearchMessages,
  SetVideoCall,
  SetVoiceCall,
  SetIncomingVoiceCall,
  SetIncomingVideoCall,
  EndCall,
  SetOngoingVoiceCall,
  SetOngoingVideoCall,
  updateVoiceCall,
  updateVideoCall,
  setonlineUsers,
} = chatReducer.actions;
export default chatReducer.reducer;
