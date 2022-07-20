import {View} from 'react-native';
import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../Translate';
import commonTranslate from '../../../../tranlates/Common';
import {editLesson, createLesson} from '../Utility';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';

function Create(props) {
  const [name, setName] = useState(
    props.lesson !== undefined ? props.lesson.name : '',
  );
  const [grade, setGrade] = useState(
    props.lesson !== undefined ? props.lesson.grade.id : undefined,
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
            <JustBottomBorderSelect
              isHalf={true}
              placeholder={Translate.level}
              setter={setGrade}
              value={props.grades.find(elem => {
                return elem.id === grade;
              })}
              values={props.grades}
            />
          </PhoneView>

          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              let res;

              if (props.lesson !== undefined) {
                res = await editLesson(
                  props.lesson.id,
                  props.lesson.grade.id,
                  props.token,
                  {
                    name: name,
                    gradeId: grade,
                  },
                );
              } else {
                res = await createLesson(props.token, grade, {name: name});
              }
              props.setLoading(false);
              if (res !== null) {
                let selectedGrade = props.grades.find(
                  elem => elem.id === grade,
                );
                props.afterFunc({
                  name: name,
                  grade: {id: selectedGrade.id, name: selectedGrade.item},
                  id: props.lesson !== undefined ? props.lesson.id : res,
                });
                props.setMode('list');
              }
            }}
            title={commonTranslate.confirm}
          />
        </View>
      </CommonWebBox>
    </View>
  );
}

export default Create;
