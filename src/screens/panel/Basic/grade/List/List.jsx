import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '../../../../../styles/common/CommonDataTable';
import {routes} from '@/api/apiRoutes';
import columns from './tableStructure';
import commonTranslator from '@/translator/common';
import Ops from '../Ops';
import {removeItems} from '../../../../../services/utility';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selected, setSelected] = useState();
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedGrade(props.grades[idx]);
    setSelected(props.grades[idx]);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          grade={selected}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.grades, props.setGrades, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <CommonWebBox
        header={commonTranslator.gradeDefinition}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          <CommonDataTable
            columns={columns}
            data={props.grades}
            setData={props.setGrades}
            handleOp={handleOp}
            removeUrl={routes.removeGrades}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}
export default List;
