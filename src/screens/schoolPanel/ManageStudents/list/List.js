import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from '../../ManageTeachers/list/TableStructure';
import Ops from '../../ManageTeachers/list/Ops/Ops';
import Translate from '../Translate';
import {routes} from '../../../../API/APIRoutes';

function List(props) {
  const [selectedId, setSelectedId] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedStudent(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          selectedId={selectedId}
          data={props.data}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          edit={props.edit}
          remove={props.remove}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        header={Translate.managementStudents}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.data}
          setData={props.setData}
          handleOp={handleOp}
          setLoading={props.setLoading}
          removeUrl={routes.removeStudents}
          token={props.token}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default List;
