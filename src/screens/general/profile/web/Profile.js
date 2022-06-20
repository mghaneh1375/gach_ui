import {Text, View} from 'react-native';
import {
  BigBoldBlueText,
  CommonWebBox,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {JustBottomBorderTextInput} from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';

const Profile = props => {
  return (
    <View>
      <CommonWebBox
        width={'60%'}
        child={
          <View>
            <BigBoldBlueText text={translator.yourInfo} />
            <EqualTwoTextInputs>
              <JustBottomBorderTextInput
                isHalf={true}
                subText={commonTranslator.necessaryField}
                placeholder={commonTranslator.firstname}
              />
              <JustBottomBorderTextInput
                isHalf={true}
                placeholder={commonTranslator.lastname}
              />
            </EqualTwoTextInputs>
          </View>
        }></CommonWebBox>
    </View>
  );
};

export default Profile;
