import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import columns from './tableStructure';
import commonTranslator from '@/translator/common';
import Ops from '../Ops.jsx';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {CommonWebBox, MyView} from '@/styles';
import {removeItems} from '@/services/utility';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selected, setSelected] = useState();
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const changeMode = newMode => {
    props.setMode(newMode);
  };
  const handleOp = idx => {
    props.setSelectedLesson(props.lessons[idx]);
    setSelected(props.lessons[idx]);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          lesson={selected}
          token={props.token}
          setLoading={props.setLoading}
          subMode={props.subMode}
          changeMode={changeMode}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.lessons, props.setLessons, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <CommonWebBox
        header={
          props.subMode === 'grades'
            ? commonTranslator.lessonsDefinitionInGrades
            : commonTranslator.lessonsDefinitionInBranches
        }
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.lessons}
          setData={props.setLessons}
          handleOp={handleOp}
          removeUrl={routes.removeLessons}
          token={props.token}
          setLoading={props.setLoading}
        />
      </CommonWebBox>
    </MyView>
  );
}
export default List;
