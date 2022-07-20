import {View} from 'react-native';
import {SimpleText} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';

const UpdateForm = props => {
  return (
    <View>
      {props.forms.map((elem, index) => {
        console.log(elem);
        return (
          <View key={index}>
            <SimpleText text={translator.formData + elem.role} />
            {elem.data.map((itr, idx) => {
              return (
                <JustBottomBorderTextInput
                  value={itr.value}
                  placeholder={itr.key}
                  subText={itr.key}
                  key={idx}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default UpdateForm;
