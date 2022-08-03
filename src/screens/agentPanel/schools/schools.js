import {View} from 'react-native-web';
import List from './components/list/List';
import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';

function Agent(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');
  // const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  // const useGlobalState = () => [
  //   React.useContext(globalStateContext),
  //   React.useContext(dispatchStateContext),
  // ];
  // const setLoading = status => {
  //   dispatch({loading: status});
  // };
  return (
    <View>
      {mode === 'list' && (
        <List
          setMode={setMode}
          // setLoading={setLoading}
          data={data}
          token={props.token}
        />
      )}
    </View>
  );
}

export default Agent;
