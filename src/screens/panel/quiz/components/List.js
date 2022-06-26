import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {
  BigBoldBlueText,
  CommonWebBox,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
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
          <TextIcon
            onPress={() => changeMode('create')}
            theme={'rect'}
            text={translator.quizes}
            icon={faPlus}
          />
        </View>
      }
    />
  );
};

export default List;
