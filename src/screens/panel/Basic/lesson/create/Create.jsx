import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView, MyView} from '@/styles';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput';
import Translate from '../../translate';
import commonTranslate from '../../../../../translator/common';
import {editLesson, createLesson} from '../../utility';
import JustBottomBorderSelect from '../../../../../styles/common/JustBottomBorderSelect';
import {styles} from '@/styles/common/styles';
function Create(props) {
  const [name, setName] = useState(
    props.lesson !== undefined ? props.lesson.name : '',
  );
  const [grade, setGrade] = useState(
    props.lesson !== undefined ? props.lesson.grade.id : undefined,
  );
  const [description, setDescription] = useState(
    props.lesson !== undefined ? props.lesson.description : '',
  );
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={
        props.lesson === undefined
          ? commonTranslate.add + ' ' + commonTranslate.lesson
          : commonTranslate.edit
      }>
      <MyView>
        <PhoneView
          style={{
            gap: 15,
          }}>
          <JustBottomBorderTextInput
            value={name}
            onChangeText={e => setName(e)}
            placeholder={commonTranslate.name}
            subText={commonTranslate.name}
          />
          <JustBottomBorderSelect
            placeholder={Translate.level}
            subText={commonTranslate.grade}
            setter={setGrade}
            value={props.grades.find(elem => {
              return elem.id === grade;
            })}
            values={props.grades}
          />
        </PhoneView>

        <JustBottomBorderTextInput
          value={description}
          onChangeText={e => setDescription(e)}
          multiline={true}
          style={styles.marginTop20}
          placeholder={commonTranslate.desc}
          subText={commonTranslate.desc}
        />

        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res;
            if (props.lesson !== undefined) {
              res = await editLesson(
                props.subMode,
                props.lesson.id,
                props.lesson.grade.id,
                props.token,
                {
                  name: name,
                  description: description,
                  gradeId: grade,
                },
              );
            } else {
              res = await createLesson(props.token, props.subMode, grade, {
                name: name,
                description: description,
              });
            }
            props.setLoading(false);
            if (res !== null) {
              const selectedGrade = props.grades.find(
                elem => elem.id === grade,
              );
              props.afterFunc({
                name: name,
                description: description,
                grade: {
                  id: selectedGrade.id,
                  name: selectedGrade.item,
                },
                id: props.lesson !== undefined ? props.lesson.id : res,
              });
              props.setMode('list');
            }
          }}
          title={commonTranslate.confirm}
        />
      </MyView>
    </CommonWebBox>
  );
}
export default Create;
