import {View} from 'react-native';
import React, {useState} from 'react';
import RadioButtonYesOrNo from '../../../../components/web/RadioButtonYesOrNo';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../Translate';
import {createGrade, editGrade} from './Utility';

function Create(props) {
  const [isOlympiad, setIsOlympiad] = useState('no');
  const [name, setName] = useState(
    props.grade !== undefined ? props.grade.name : '',
  );

  return (
    <View>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        header={Translate.edit}>
        <View>
          <PhoneView>
            <JustBottomBorderTextInput
              value={name}
              onChangeText={e => setName(e)}
              placeholder={props.name}
            />
            <RadioButtonYesOrNo
              selected={isOlympiad}
              setSelected={setIsOlympiad}
              label={Translate.addOlympiad}
            />
          </PhoneView>

          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              let res;

              if (props.grade !== undefined) {
                res = await editGrade(
                  props.grade.id,
                  props.token,
                  {name: name},
                  isOlympiad,
                );
              } else {
                res = await createGrade(props.token, {name: name}, isOlympiad);
              }

              props.setLoading(false);
              if (res !== null) {
                props.afterFunc({
                  name: name,
                  id: props.grade !== undefined ? props.grade.id : res,
                  isOlympiad: isOlympiad === 'yes' ? true : false,
                });
                props.setMode('list');
              }
            }}
            title="ثبت"
          />
        </View>
      </CommonWebBox>
    </View>
  );
}

export default Create;
