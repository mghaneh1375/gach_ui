import React, {useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import certTranslator from '../Translator';
import Ops from './Ops/Ops';
import columns from './TableStructure';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedCertificate(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <CommonWebBox
      header={certTranslator.haveCertificate}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {showOpPopUp && (
        <Ops
          id={selectedId}
          Certificate={props.setSelectedCertificate}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          remove={props.remove}
          update={props.update}
          setMode={props.setMode}
        />
      )}
      <CommonDataTable
        columns={columns}
        data={props.data}
        setData={props.setData}
        handleOp={handleOp}
        //   removeUrl={routes.removeCertificate}
        token={props.token}
        setLoading={props.setLoading}
      />
    </CommonWebBox>
  );
}

export default List;
