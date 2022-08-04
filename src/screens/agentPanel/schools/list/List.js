import {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import Ops from './Ops/Ops';

function List(props) {
  const [selectedId, setSelectedId] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedAgent(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <View>
      {showOpPopUp && (
        <Ops
          selectedId={selectedId}
          data={props.data}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          //remove={props.remove}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        header={'سلام'}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.data}
          setData={props.setData}
          handleOp={handleOp}
        />
      </CommonWebBox>
    </View>
  );
}

export default List;
