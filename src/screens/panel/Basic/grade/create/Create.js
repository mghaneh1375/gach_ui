import React, {useState} from 'react';
import Translate from '../../Translate';
import commonTranslate from '../../../../../tranlates/Common';
import {createGrade, editGrade} from '../../Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import RadioButtonYesOrNo from '../../../../../components/web/RadioButtonYesOrNo';

function Create(props) {
  const [isOlympiad, setIsOlympiad] = useState(
    props.grade !== undefined ? (props.grade.isOlympiad ? 'yes' : 'no') : 'no',
  );
  const [name, setName] = useState(
    props.grade !== undefined ? props.grade.name : '',
  );

  return (
    <MyView>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        header={
          props.grade === undefined
            ? commonTranslate.add + ' ' + commonTranslate.grade
            : commonTranslate.edit
        }>
        <MyView>
          <PhoneView style={{gap: 15}}>
            <JustBottomBorderTextInput
              value={name}
              onChangeText={e => setName(e)}
              placeholder={props.name}
              subText={commonTranslate.grade}
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
            title={commonTranslate.confirm}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default Create;
