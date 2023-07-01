import {dispatchStateContext, globalStateContext} from '../../../App';
import Chat from './Chat';
import {ChatProvider} from './components/Context';
import React from 'react';

function ChatRoom(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = new_status => {
    dispatch({loading: new_status});
  };

  return (
    <ChatProvider>
      <Chat token={state.token} user={state.user} setLoading={setLoading} />
    </ChatProvider>
  );
}

export default ChatRoom;
