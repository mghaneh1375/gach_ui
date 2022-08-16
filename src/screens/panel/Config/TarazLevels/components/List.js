import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import translator from '../Translator';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import {routes} from '../../../../../API/APIRoutes';
import Ops from './Ops';

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
        <MyView>
          <CommonDataTable
            columns={columns}
            data={props.levels}
            handleOp={handleOp}
            setData={props.setData}
            removeUrl={routes.removeSchools}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default List;
