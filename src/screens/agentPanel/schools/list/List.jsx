import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '../../../../styles/common/CommonDataTable.jsx';
import {columnsForAdmin, columnsForAgent} from './tableStructure';
import Ops from './ops/Ops.jsx';
import commonTranslator from '@/translator/common';
import {routes} from '@/api/apiRoutes';
import {isUserAdmin} from '../../../../services/utility';
function List(props) {
  const [selectedId, setSelectedId] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedAgent(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          selectedId={selectedId}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          edit={props.edit}
          remove={props.remove}
          setMode={props.setMode}
          isAdmin={isUserAdmin(props.user)}
        />
      )}
      <CommonWebBox
        header={commonTranslator.schools}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={isUserAdmin(props.user) ? columnsForAdmin : columnsForAgent}
          data={props.data}
          token={props.token}
          setLoading={props.setLoading}
          setData={props.setData}
          groupOps={[
            {
              key: 'removeAll',
              label: commonTranslator.deleteAll,
              url: routes.removeSchoolFormAgent,
              warning: commonTranslator.sureRemove,
              method: 'delete',
              afterFunc: res => {
                props.data = props.selectedStudents.map(elem => {
                  if (res.doneIds.indexOf(elem.id) === -1) return elem;
                  elem.agent = '';
                  return elem;
                });
                props.setData(props.data);
              },
            },
          ]}
          handleOp={handleOp}
        />
      </CommonWebBox>
    </MyView>
  );
}
export default List;
