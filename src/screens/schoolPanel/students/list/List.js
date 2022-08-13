import {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from '../../teachers/list/TableStructure';
import Ops from '../../teachers/list/Ops/Ops';
import Translate from '../Translate';

function List(props) {
  const [selectedId, setSelectedId] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedStudent(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          selectedId={selectedId}
          data={props.data}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          edit={props.edit}
          remove={props.remove}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        header={Translate.managementStudents}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.data}
          setData={props.setData}
          handleOp={handleOp}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default List;
