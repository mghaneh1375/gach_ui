import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonWebBox, PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {PointProvider} from './components/Context';
import List from './components/List';
import Create from './components/Create';

function Point(props) {
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
    <PointProvider>
      {mode === 'list' && (
        <List
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
          setMode={setMode}
        />
      )}
      {mode === 'create' && (
        <Create
          updateMode={false}
          setLoading={setLoading}
          token={state.token}
          setMode={setMode}
        />
      )}
      {mode === 'edit' && (
        <Create
          updateMode={true}
          setLoading={setLoading}
          token={state.token}
          setMode={setMode}
        />
      )}
    </PointProvider>
  );
}

export default Point;
