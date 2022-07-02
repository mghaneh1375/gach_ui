import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import translator from '../Translator';

const List = props => {
  const changeMode = newMode => {
    props.setMode(newMode);
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
        </View>
      }
    />
  );
};

export default List;
