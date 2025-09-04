import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {NotifProvider} from './components/Context.jsx';
import Create from './components/create/Create.jsx';
import List from './components/list/List.jsx';
import Students from './components/Students.jsx';
function Notif(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  const [mode, setMode] = useState('list');
  return (
    <NotifProvider>
      {mode === 'list' && (
        <List
          sendVia={props.sendVia}
          setMode={setMode}
          setLoading={setLoading}
          navigate={navigate}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <Create
          sendVia={props.sendVia}
          setMode={setMode}
          isInReviewMode={false}
          token={state.token}
          setLoading={setLoading}
          navigate={navigate}
        />
      )}
      {mode === 'info' && (
        <Create
          setMode={setMode}
          isInReviewMode={true}
          token={state.token}
          setLoading={setLoading}
          navigate={navigate}
        />
      )}

      {mode === 'students' && (
        <Students
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
          navigate={navigate}
        />
      )}
    </NotifProvider>
  );
}
export default Notif;
