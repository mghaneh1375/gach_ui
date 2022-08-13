import {View} from 'react-native-web';
import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../../App';
import List from './list/List';
import {getConfig} from './Utility';

function ConfigGift(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState();
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [selectedId, setSelectedId] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getConfig(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, dispatch]);
  return (
    <MyView>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          selectedId={selectedId}
          token={props.token}
        />
      )}
    </MyView>
  );
}

export default ConfigGift;
