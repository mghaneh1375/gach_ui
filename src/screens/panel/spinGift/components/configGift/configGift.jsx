import React, {useState} from 'react';
import List from './list/List.jsx';
import {getConfig} from './utility';
import {MyView} from '@/styles';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';

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
    dispatch({
      loading: status,
    });
  };
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([getConfig(props.token)]).then(res => {
      dispatch({
        loading: false,
      });
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
