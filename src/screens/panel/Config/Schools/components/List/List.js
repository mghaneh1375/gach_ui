import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../../styles/Common';
import translator from '../../Translator';
import Filter from './Filter';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns from './TableStruture';
import {routes} from '../../../../../../API/APIRoutes';
import Ops from '../Ops';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const handleOp = idx => {
    props.setSelectedSchool(props.schools[idx]);
    toggleShowOpPopUp();
  };

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          school={props.selectedSchool}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          updateSchool={props.updateSchool}
          setMode={props.setMode}
          removeSchools={props.removeSchools}
        />
      )}
      <CommonWebBox
        header={translator.offs}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          <Filter
            setData={props.setData}
            token={props.token}
            setLoading={props.setLoading}
            states={props.states}
          />
          <CommonDataTable
            columns={columns}
            data={props.schools}
            setData={props.setData}
            handleOp={handleOp}
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
