import React, {useState} from 'react';
import {View} from 'react-native';
import {useLocation} from 'react-router';
import {dispatchStateContext, globalStateContext} from '../../../../../App';
import List from './list/List';
import Create from './create/Create';
import {getAllGift} from '../configGift/Utility';
import {addItem} from '../../../../../services/Utility';

function SelectGift(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [gifts, setGifts] = useState([
    {
      typeGift: 'coin',
      valueGift: '100',
      howMany: '1',
      probability: '100',
      useable: 'true',
      priority: '1',
    },
  ]);
  const [selectedGift, setSelectedGift] = useState({});
  const setLoading = status => {
    dispatch({loading: status});
  };

  let {search} = useLocation();

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getAllGift(props.token)]).then(res => {
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
          gifts={gifts}
          data={data}
          setData={setData}
          //   isAdmin={isAdmin}
          setGifts={setGifts}
          token={props.token}
          setSelectedGift={setSelectedGift}
        />
      )}
      {mode === 'create' && (
        <Create
          user={props.user}
          setMode={setMode}
          addItem={i => addItem(data, setData, i)}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
}

export default SelectGift;
