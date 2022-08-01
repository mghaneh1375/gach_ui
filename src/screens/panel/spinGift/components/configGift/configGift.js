import {View} from 'react-native-web';
import {CommonWebBox} from '../../../../../styles/Common';
import commonTranslator from '../../../../../tranlates/Common';
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
  const [gifts, setGifts] = useState();
  const [data, setData] = useState();
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
    <View>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          token={props.token}
        />
      )}
    </View>
  );
}

export default ConfigGift;
