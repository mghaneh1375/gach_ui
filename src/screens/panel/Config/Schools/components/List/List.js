import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../../styles/Common';
import translator from '../../Translator';
import Filter from './Filter';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns, {columnsForUsers} from './TableStruture';
import {routes} from '../../../../../../API/APIRoutes';
import Ops from '../Ops';
import vars from '../../../../../../styles/root';

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
      {showOpPopUp && props.isAdmin && (
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
        <MyView style={{gap: 15}}>
          <Filter
            setData={props.setData}
            token={props.token}
            setLoading={props.setLoading}
            states={props.states}
            isAdmin={props.isAdmin}
          />
          <CommonDataTable
            columns={props.isAdmin ? columns : columnsForUsers}
            data={props.schools}
            excel={props.isAdmin}
            setData={props.isAdmin ? props.setData : undefined}
            handleOp={props.isAdmin ? handleOp : undefined}
            removeUrl={props.isAdmin ? routes.removeSchools : undefined}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default List;
