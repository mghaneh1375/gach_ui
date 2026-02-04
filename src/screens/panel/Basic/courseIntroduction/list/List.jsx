import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {routes} from '@/api/apiRoutes';
import columns from './tableStructure';
import commonTranslator from '@/translator/common';
import Ops from '../Ops.jsx';
import {removeItems} from '@/services/utility';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selected, setSelected] = useState();
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedGrade(props.data[idx]);
    setSelected(props.data[idx]);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          selected={selected}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.data, props.setData, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <CommonWebBox
        header={commonTranslator.courseIntroductionDefinition}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          <CommonDataTable
            columns={columns}
            data={props.data}
            setData={props.setData}
            handleOp={handleOp}
            removeUrl={routes.removeCourseIntroduction}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}
export default List;
