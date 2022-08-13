import React, {useState} from 'react';
import {View} from 'react-native';
import {useLocation} from 'react-router';
import {dispatchStateContext, globalStateContext} from '../../../../../App';
import List from './list/List';
import Create from './create/Create';
import {getAllGift} from '../configGift/Utility';
import {addItem, editItem, removeItems} from '../../../../../services/Utility';
import {MyView} from '../../../../../styles/Common';

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
  const [selectedGift, setSelectedGift] = useState({});
  const [gifts, setGifts] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

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
    <MyView>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          setData={setData}
          token={props.token}
          remove={ids => removeItems(data, setData, ids)}
          setSelectedGift={setSelectedGift}
          update={item => editItem(data, setData, item)}
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
      {mode === 'update' && (
        <Create
          user={props.user}
          setMode={setMode}
          gift={selectedGift}
          update={item => editItem(data, setData, item)}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </MyView>
  );
}

export default SelectGift;
