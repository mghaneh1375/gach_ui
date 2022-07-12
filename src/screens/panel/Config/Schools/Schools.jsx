import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import translator from './Translator';
import commonTranslator from '../../../../tranlates/Common';
import {View} from 'react-native';

function Schools(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [schools, setSchools] = useState();
  const [mode, setMode] = useState('list');

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAllOffs,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setSchools(res[0]);
      dispatch({loading: false});
    });
  }, [navigate, props.token, dispatch]);

  return (
    <View style={{zIndex: 10}}>
      {mode === 'list' && (
        <List
          offs={offs}
          setMode={setMode}
          setData={setOffs}
          setLoading={setLoading}
          token={props.token}
          setSelectedOff={setSelectedOff}
          selectedOff={selectedOff}
          removeOffs={removeOffs}
        />
      )}
    </View>
  );
}

export default Schools;
