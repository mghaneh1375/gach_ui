import {useState} from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../../styles/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import translator from '../../Translator';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';
import Filter from './Filter';
import Ops from '../Ops';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = index => {
    props.setSelected(props.data[index]);
    setShowOpPopUp(true);
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOpPopUp(false)}
        />
      )}
      <CommonWebBox
        header={translator.questions}
        addBtn={true}
        onAddBtn={() => props.setMode('create')}>
        <Filter
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
    </View>
  );
};

export default List;
