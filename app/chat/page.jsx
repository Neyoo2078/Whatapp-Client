'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import ChatList from '@/components/ChatList';
import Empty from '@/components/Empty';
import Chats from '@/components/Chats';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ReducerSesiion } from '@/reduxReducers/Reducers';
import VoiceCall from '@/components/VoiceCall';
import VideoCall from '@/components/VideoCall';
import IncomingVideoCall from '@/components/IncomingVideoCall';
import IncomingVoiceCall from '@/components/IncomingVoiceCall';
import OngoingVideoCalls from '@/components/OngoingVideoCall';
import OngoingVoiceCalls from '@/components/OngoingVoiceCall';
import { SocketReducer } from '@/reduxReducers/Reducers';
import { SetIncomingVideoCall } from '@/reduxReducers/Reducers';
import { SetIncomingVoiceCall } from '@/reduxReducers/Reducers';
import { EndCall } from '@/reduxReducers/Reducers';
import { SetVideoCall } from '@/reduxReducers/Reducers';
import { SetVoiceCall } from '@/reduxReducers/Reducers';
import { updateVoiceCall } from '@/reduxReducers/Reducers';
import { updateVideoCall } from '@/reduxReducers/Reducers';
import { setonlineUsers } from '@/reduxReducers/Reducers';

const Chat = () => {
  const { data: session, status } = useSession();
  if (session) {
    const { id } = session.user;
  }
  const route = useRouter();
  const [User, setUser] = useState(null);

  const {
    currentChat,
    videoCall: isvideoCall,
    voiceCall: isvoiceCall,
    incomingVoiceCall,
    incomingVideoCall,
    OngoingVoiceCall,
    OngoingVideoCall,
  } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReducerSesiion(session));
  }, [session]);
  async function fetchUserData() {
    const res = await fetch(`/api/getuserdata/${session?.user.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    const data = await res.json();
    console.log({ data });
    setUser(data);
    dispatch(ReducerSesiion(data));
  }
  useEffect(() => {
    fetchUserData();
  }, [session]);

  // SOCKET IO
  const baseUrl = process.env.BaseUrl;
  // initialize Io
  const sockett = io(process.env.BaseUrl);
  useEffect(() => {
    if (session?.user) {
      sockett.emit('add-user', session.user.id);
      dispatch(SocketReducer(sockett));
    }
  }, [session?.user]);

  sockett?.on('online_users', ({ onlineUser }) => {
    dispatch(setonlineUsers(onlineUser));
  });

  sockett?.on('incoming_voice_call', ({ from, roomId, callType }) => {
    dispatch(SetIncomingVoiceCall({ ...from, roomId, callType }));
  });

  sockett?.on('incoming_video_call', ({ from, roomId, callType }) => {
    dispatch(SetIncomingVideoCall({ ...from, roomId, callType }));
  });
  sockett?.on('end_voice_call', () => {
    dispatch(EndCall());
  });
  sockett?.on('voice_call_rejected', () => {
    dispatch(EndCall());
  });

  sockett?.on('video_call_rejected', () => {
    dispatch(EndCall());
  });
  sockett?.on('accept-call', () => {
    dispatch(updateVoiceCall());
  });
  sockett?.on('accept-Vcall', () => {
    dispatch(updateVideoCall());
  });

  return (
    <div className="bg-what-bg h-screen flex min-h-screen w-full">
      <ChatList user={User} />
      <div className="w-[75%] relative flex justify-center">
        {incomingVoiceCall && <IncomingVoiceCall />}
        {incomingVideoCall && <IncomingVideoCall />}
        {!currentChat && !OngoingVideoCall && !OngoingVoiceCall ? (
          <Empty />
        ) : (
          <div className="w-full">
            {isvideoCall && <VideoCall data={currentChat} />}
            {isvoiceCall && <VoiceCall data={currentChat} />}
            {OngoingVideoCall && <OngoingVideoCalls />}
            {OngoingVoiceCall && <OngoingVoiceCalls />}
            {!isvideoCall &&
              !isvoiceCall &&
              !incomingVoiceCall &&
              !incomingVideoCall &&
              !OngoingVideoCall &&
              !OngoingVoiceCall && <Chats user={User} data={currentChat} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
