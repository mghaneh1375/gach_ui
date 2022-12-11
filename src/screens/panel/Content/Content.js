import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {ContentProvider} from './Components/Context';
import Create from './Components/Create';
import List from './Components/List/List';
import SessionsList from './Components/Session/List';
import CreateSession from './Components/Session/Create';
import Attach from './Components/Session/Attach';

function Content(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <ContentProvider>
      {mode === 'list' && (
        <List
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          navigate={navigate}
        />
      )}
      {mode === 'create' && (
        <Create
          isInEditMode={false}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
      {mode === 'update' && (
        <Create
          isInEditMode={true}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
      {mode === 'sessions' && (
        <SessionsList
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          navigate={navigate}
        />
      )}
      {mode === 'attaches' && (
        <Attach
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          navigate={navigate}
        />
      )}
      {mode === 'createSession' && (
        <CreateSession
          isInEditMode={false}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
      {mode === 'updateSession' && (
        <CreateSession
          isInEditMode={true}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
    </ContentProvider>
  );
}

export default Content;
