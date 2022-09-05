import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../styles/Common';
import DynamicParameters from './components/DynamicParameters';
import SelectFile from './components/SelectFile';
import Buttons from './components/Buttons';
import certTranslator from './Translator';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './List/List';
import {addItem, editItem, removeItems} from '../../../services/Utility';
import Create from './Create/Create';
import AttachBox from '../ticket/components/Show/AttachBox/AttachBox';

const Certificate = props => {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState([
    {certName: 'asdasdasd', createDate: 'asdasd'},
  ]);
  const [selectedCertificate, setSelectedCertificate] = useState({});

  const setLoading = status => {
    dispatch({loading: status});
  };
  // React.useEffect(() => {
  //   dispatch({loading: true});
  //   Promise.all([getCertificat(props.token)]).then(res => {
  //     dispatch({loading: false});
  //     if (res[0] === null) {
  //       navigate('/');
  //       return;
  //     }
  //     setData(res[0]);
  //     setMode('list');
  //   });
  // }, [navigate, props.token, dispatch]);

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
      {/*
      {mode === 'update' && (
        <Create
          user={props.user}
          setMode={setMode}
          gift={selectedGift}
          update={item => editItem(data, setData, item)}
          setLoading={setLoading}
          token={props.token}
        />
      )} */}
      <CommonWebBox>
        <AttachBox
        // filename={file.name}
        // fileContent={file.content}
        // removeAttach={() => removeAttac()}
        />
      </CommonWebBox>
      <CommonWebBox child={<Buttons />} />
    </MyView>
  );
};

export default Certificate;
