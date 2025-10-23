import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {ContentProvider} from './components/Context.jsx';
import Create from './components/Create.jsx';
import List from './components/list/List.jsx';
import SessionsList from './components/session/List.jsx';
import CreateSession from './components/session/Create.jsx';
import Attach from './components/session/Attach.jsx';
import Students from './components/studentsList/Students.jsx';
import Seo from './seo/Seo.jsx';
import {isUserAdmin, isUserEditorAccess} from '@/services/utility.js';
import IndividualFAQ from './individualFAQ/IndividualFAQ.jsx';
function Content(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  const [selectedContentId, setSelectedContentId] = useState();
  // React.useEffect(() => {
  //   if (selectedContentId === undefined) return;
  //   setMode('seo');
  // }, [selectedContentId]);

  const isEditor = isUserEditorAccess(state.user);
  const isAdmin = isUserAdmin(state.user);
  return (
    <ContentProvider>
      {mode === 'list' && (
        <List
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          setSelectedContentId={setSelectedContentId}
          navigate={navigate}
          isEditor={isEditor}
          isAdmin={isAdmin}
        />
      )}
      {mode === 'seo' && (
        <Seo
          onBackClick={() => {
            setSelectedContentId(undefined);
            setMode('list');
          }}
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          navigate={navigate}
          packageId={selectedContentId}
        />
      )}
      {mode === 'faq' && (
        <IndividualFAQ
          onBackClick={() => {
            setSelectedContentId(undefined);
            setMode('list');
          }}
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          navigate={navigate}
          packageId={selectedContentId}
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
      {mode === 'studentsList' && isEditor && (
        <Students
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
          isAdmin={isAdmin}
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
