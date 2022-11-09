import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import {ContentProvider} from './Components/Context';
import List from './Components/List/List';
function Content(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <ContentProvider>
      {mode === 'list' && (
        <List
          token={props.token}
          setLoading={setLoading}
          setMode={setMode}
          navigate={navigate}
        />
      )}
    </ContentProvider>
  );
}

export default Content;
