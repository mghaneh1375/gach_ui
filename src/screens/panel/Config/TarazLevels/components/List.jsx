import React, {useState} from 'react';
import {CommonWebBox, MyView} from '@/styles';
import translator from '../translator';
import CommonDataTable from '../../../../../styles/common/CommonDataTable.jsx';
import columns from './tableStructure';
import {routes} from '@/api/apiRoutes';
import Ops from './Ops.jsx';
function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedLevel(props.levels[idx]);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops toggleShowPopUp={toggleShowOpPopUp} setMode={props.setMode} />
      )}
      <CommonWebBox
        header={translator.levels}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.levels}
          handleOp={handleOp}
          setData={props.setData}
          removeUrl={routes.removeTarazLevels}
          token={props.token}
          setLoading={props.setLoading}
        />
      </CommonWebBox>
    </MyView>
  );
}
export default List;
