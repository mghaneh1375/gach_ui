import React, {useState} from 'react';
import {MyView} from '../../../styles/Common';

import {dispatchStateContext} from '../../../App';
import List from './List/List';
import {addItem, editItem, removeItems} from '../../../services/Utility';
import Create from './Create/Create';
import AddStudent from './AddStudent/AddStudent';
import {getCertificates} from './Utility';
import Students from './Students/List';

const Certificate = props => {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [mode, setMode] = useState('list');
  const [dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [selectedCertificate, setSelectedCertificate] = useState();

  React.useEffect(() => {}, [selectedCertificate]);

  const setLoading = status => {
    dispatch({loading: status});
  };
  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getCertificates(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
    });
  }, [navigate, props.token, dispatch]);

  return (
    <MyView style={{zIndex: 'unset'}}>
      {mode === 'list' && data !== undefined && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          setData={setData}
          token={props.token}
          remove={ids => removeItems(data, setData, ids)}
          setSelectedCertificate={setSelectedCertificate}
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
          certId={selectedCertificate.id}
          update={item => editItem(data, setData, item)}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'addStudent' && (
        <AddStudent
          setMode={setMode}
          setLoading={setLoading}
          selectedCertificate={selectedCertificate}
          token={props.token}
        />
      )}
      {mode === 'report' && (
        <Students
          setMode={setMode}
          setLoading={setLoading}
          selectedCertificate={selectedCertificate}
          token={props.token}
        />
      )}
    </MyView>
  );
};

export default Certificate;
