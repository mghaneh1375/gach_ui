import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {BarcodeProvider} from '../Barcode/components/Context';
import Create from './components/Create';
import List from './components/List';

function Course(props) {
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
    <BarcodeProvider>
      {mode === 'list' && (
        <List
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </BarcodeProvider>
  );
}

export default Course;
