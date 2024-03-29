import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {routes} from '../../../../../API/APIRoutes';
import columns from './TableStructure';
import commonTranslator from '../../../../../translator/Common';
import Ops from '../Ops';
import {removeItems} from '../../../../../services/Utility';

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
