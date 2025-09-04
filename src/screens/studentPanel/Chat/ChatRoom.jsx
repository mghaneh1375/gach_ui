import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import Chat from './chat';
import {ChatProvider} from './components/Context.jsx';
import React from 'react';
function ChatRoom(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = new_status => {
    dispatch({
      loading: new_status,
    });
  };
  return (
    <ChatProvider>
      <Chat token={state.token} user={state.user} setLoading={setLoading} />
    </ChatProvider>
  );
}
export default ChatRoom;
