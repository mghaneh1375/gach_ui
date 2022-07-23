import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import translator from '../../Translator';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';

const List = props => {
  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const handleOp = index => {
    props.setSelected(props.data[index]);
  };

  return (
    <CommonWebBox
      child={
        <View>
          <PhoneView>
            <TextIcon
              onPress={() => changeMode('create')}
              theme={'rect'}
              text={translator.quizes}
              icon={faPlus}
            />
            <CommonButton
              onPress={() => props.toggleShowAddBatchPopUp()}
              theme={'dark'}
              title={translator.uploadExcelFile}
            />
            <CommonButton
              onPress={() => props.toggleShowAddBatchFilesPopUp()}
              theme={'dark'}
              title={translator.uploadZipFile}
            />
          </PhoneView>
          <CommonDataTable
            columns={columns}
            handleOp={handleOp}
            groupOps={[]}
            data={props.data}
          />
        </View>
      }
    />
  );
};

export default List;
