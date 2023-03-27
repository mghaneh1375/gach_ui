import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import translator from '../../Translator';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import Filter from './Filter';
import Ops from '../Ops';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const handleOp = index => {
    props.setSelected(props.data[index]);
    setShowOpPopUp(true);
  };

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOpPopUp(false)}
        />
      )}
      <CommonWebBox
        header={translator.questions}
        addBtn={props.isAdmin ? true : undefined}
        backBtn={props.isAdmin ? undefined : true}
        onAddClick={() => (props.isAdmin ? props.setMode('create') : undefined)}
        onBackClick={() => (!props.isAdmin ? props.setMode('end') : undefined)}>
        <Filter
          setMode={props.setMode}
          setLoading={props.setLoading}
          setData={props.setData}
          grades={props.grades}
          token={props.token}
        />
        <CommonDataTable
          columns={columns}
          handleOp={handleOp}
          groupOps={[]}
          data={props.data}
        />
      </CommonWebBox>
    </MyView>
  );
};

export default List;
