import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {CommonWebBox} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import certTranslator from '../translator';
import Ops from './ops/Ops.jsx';
import columns from './tableStructure';
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
        removeUrl={routes.removeCertificate}
        token={props.token}
        setLoading={props.setLoading}
      />
    </CommonWebBox>
  );
}
export default List;
