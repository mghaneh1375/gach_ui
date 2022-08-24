import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import {MyView} from '../../../styles/Common';
import Create from './components/Create';
import List from './components/List/List';
import {filter} from './components/Utility';
import {editItem} from './../../../services/Utility';

const Off = props => {
  const [mode, setMode] = useState('list');
  const [offs, setOffs] = useState();
  const [selectedOff, setSelectedOff] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

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
    <MyView>
      {mode === 'list' && offs !== undefined && (
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
        <Create
          setMode={setMode}
          updateOff={item => editItem(offs, setOffs, item)}
          setLoading={setLoading}
          token={props.token}
          off={selectedOff}
        />
      )}
    </MyView>
  );
};

export default Off;
