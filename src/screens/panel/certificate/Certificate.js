import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../styles/Common';
import DynamicParameters from './components/DynamicParameters';
import SelectFile from './components/SelectFile';
import NextButtons from './components/NextButtons';
import certTranslator from './Translator';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './List/List';
import {addItem, editItem, removeItems} from '../../../services/Utility';
import Create from './Create/Create';
import AttachBox from '../ticket/components/Show/AttachBox/AttachBox';
import AddStudent from './AddStudent/AddStudent';
import {getCertificate, getCertificates} from './Utility';
import Report from './Report/Report';

const Certificate = props => {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [addStudent, setAddStudent] = useState();
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
          selectedCertificate={selectedCertificate}
          update={item => editItem(data, setData, item)}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'addStudent' && (
        <AddStudent
          setMode={setMode}
          // addItem={i => addItem(data, setData, i)}
          setLoading={setLoading}
          // update={item => {
          //   editItem(data, setData, item);
          //   setSelectedCertificate(item);
          // }}
          selectedCertificate={selectedCertificate}
          token={props.token}
        />
      )}
      {mode === 'report' && (
        <Report
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
