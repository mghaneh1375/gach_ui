import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {MyView} from '../../../styles/Common';
import Create from './components/Create';
import List from './components/List/List';
import Update from './components/Update';
import {filter} from './components/Utility';

const Off = props => {
  const [mode, setMode] = useState('list');
  const [offs, setOffs] = useState([]);
  const [selectedOff, setSelectedOff] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const addOffs = items => {
    if (items === undefined) return;
    let allOffs = offs;
    items.forEach(element => {
      allOffs.unshift(element);
    });
    setOffs(allOffs);
  };

  const updateOff = item => {
    if (item === undefined) return;
    let allOffs = offs;
    for (let i = 0; i < offs.length; i++) {
      if (offs[i].id === item.id) {
        offs[i] = item;
        break;
      }
    }

    setOffs(allOffs);
  };

  const removeOffs = items => {
    let allOffs = offs;

    allOffs = allOffs.filter(function (element) {
      return items.indexOf(element.id) === -1;
    });

    setOffs(allOffs);
  };

  React.useEffect(() => {
    filter({
      setLoading: status => dispatch({loading: status}),
      token: props.token,
      setData: setOffs,
    });
  }, [navigate, props.token, dispatch]);

  return (
    <MyView style={{zIndex: 10}}>
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
      {mode === 'create' && (
        <Create
          setMode={setMode}
          addOffs={addOffs}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'update' && (
        <Update
          setMode={setMode}
          updateOff={updateOff}
          setLoading={setLoading}
          token={props.token}
          off={selectedOff}
        />
      )}
    </MyView>
  );
};

export default Off;
