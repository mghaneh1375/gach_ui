import React, {useState} from 'react';
import {View} from 'react-native';
import {TinyTextIcon} from '../../../styles/Common/TextIcon';
import Card from './card/Card';
import Translate from './Translate';
import {globalStateContext, dispatchStateContext} from '../../../App';
import List from './components/List/List';
import {fetchAllPackages} from './components/Utility';

function Package(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };

  const [packages, setPackages] = useState();
  const [mode, setMode] = useState('');

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([fetchAllPackages(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setPackages(res[0]);
      setMode('list');
    });
  }, [dispatch, props.token, navigate]);

  return (
    <View>
      {mode === 'list' && <List isAdmin={true} packages={packages} />}
    </View>
  );
}

export default Package;
