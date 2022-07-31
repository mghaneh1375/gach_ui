import React, {useState} from 'react';
import {routes} from '../../../../../../API/APIRoutes';
import {removeItems} from '../../../../../../services/Utility';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import Ops from '../Ops';
import columns from './TableStructure';
import commonTranslator from '../../../../../../tranlates/Common';
import {CommonWebBox} from '../../../../../../styles/Common';

function List(props) {
  const [showOpModel, setShowOpModel] = useState();
  const [selected, setSelected] = useState();

  const toggleShowOpPopUp = () => {
    setShowOpModel(!showOpModel);
  };

  const handleOp = idx => {
    props.setSelectedSubject(props.subjects[idx]);
    setSelected(props.subjects[idx]);
    toggleShowOpPopUp();
  };

  return (
    <CommonWebBox
      header={commonTranslator.subjectDefinition}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {showOpModel && (
        <Ops
          subject={selected}
          token={props.token}
          setLoading={props.setLoading}
          changeMode={mode => props.setMode(mode)}
          toggleShowPopUp={toggleShowOpPopUp}
          afterDelete={ids => {
            removeItems(props.subjects, props.setSubjects, ids);
            toggleShowOpPopUp();
          }}
        />
      )}
      <CommonDataTable
        columns={columns}
        data={props.subjects}
        setData={props.setSubjects}
        token={props.token}
        setLoading={props.setLoading}
        handleOp={handleOp}
        removeUrl={routes.removeSubjects}
      />
    </CommonWebBox>
  );
}

export default List;
