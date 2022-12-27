import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {ContentProvider} from '../Components/Context';
import Create from './components/Create';
import List from './components/List';

function Seo(props) {
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
          packageId={props.packageId === undefined ? null : props.packageId}
          setMode={setMode}
          setLoading={setLoading}
          navigate={props.navigate}
          token={state.token}
          onBackClick={props.onBackClick}
        />
      )}
      {mode === 'create' && (
        <Create
          packageId={props.packageId === undefined ? null : props.packageId}
          setMode={setMode}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </ContentProvider>
  );
}

export default Seo;
