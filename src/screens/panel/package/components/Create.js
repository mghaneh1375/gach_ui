import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../translator/Common';
import Translate from '../Translate';
import React, {useState} from 'react';
import {changeText} from '../../../../services/Utility';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {createPackage, editPackage} from './Utility';

function Create(props) {
  const [title, setTitle] = useState(
    props.package !== undefined ? props.package.title : '',
  );
  const [minSelect, setMinSelect] = useState(
    props.package !== undefined ? props.package.minSelect : '',
  );
  const [desc, setDesc] = useState(
    props.package !== undefined ? props.package.description : '',
  );
  const [offPercent, setOffPercent] = useState(
    props.package !== undefined ? props.package.offPercent : '',
  );
  const [lesson, setLesson] = useState(
    props.package !== undefined && props.package.lesson !== undefined
      ? props.package.lesson.id
      : undefined,
  );
  const [grade, setGrade] = useState(
    props.package !== undefined ? props.package.grade.id : undefined,
  );
  const [lessons, setLessons] = useState();

  React.useEffect(() => {
    if (grade === undefined) return;

    setLessons(
      props.grades
        .find(elem => elem.id === grade)
        .lessons.map(elem => {
          return {id: elem.id, item: elem.name};
        }),
    );
  }, [grade, props.grades]);

  return (
    <CommonWebBox
      header={commonTranslator.title}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          placeholder={commonTranslator.title}
          subText={commonTranslator.title}
          value={title}
          onChangeText={text => changeText(text, setTitle)}
        />
        <JustBottomBorderTextInput
          placeholder={Translate.minSelect}
          subText={Translate.minSelect}
          value={minSelect}
          justNum={true}
          onChangeText={text => changeText(text, setMinSelect)}
        />
        <JustBottomBorderTextInput
          placeholder={Translate.mizanTakhfif}
          subText={Translate.mizanTakhfif}
          value={offPercent}
          justNum={true}
          onChangeText={text => changeText(text, setOffPercent)}
        />
        <JustBottomBorderSelect
          placeholder={commonTranslator.grade}
          subText={commonTranslator.grade}
          setter={setGrade}
          value={props.grades.find(elem => {
            return elem.id === grade;
          })}
          values={props.grades}
        />
        <JustBottomBorderSelect
          placeholder={commonTranslator.lesson}
          subText={commonTranslator.lesson}
          setter={setLesson}
          value={
            lessons !== undefined
              ? [{id: -1, item: 'بدون درس'}].concat(lessons).find(elem => {
                  return elem.id === lesson;
                })
              : ''
          }
          values={
            lessons !== undefined
              ? [{id: -1, item: 'بدون درس'}].concat(lessons)
              : []
          }
        />
      </PhoneView>
      <MyView>
        <JustBottomBorderTextInput
          multiline={true}
          subText={commonTranslator.desc}
          placeholder={commonTranslator.desc}
          value={desc}
          onChangeText={text => changeText(text, setDesc)}
        />
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res;
            let data = {
              title: title,
              description: desc,
              gradeId: grade,
              lessonId: lesson === -1 ? undefined : lesson,
              minSelect: minSelect,
              offPercent: offPercent,
            };

            if (props.package !== undefined)
              res = await editPackage(props.package.id, props.token, data);
            else res = await createPackage(props.token, data);

            props.setLoading(false);
            if (res !== null) {
              let selectedGrade = props.grades.find(elem => elem.id === grade);

              let selectedLesson =
                lesson === undefined
                  ? undefined
                  : lessons.find(elem => elem.id === lesson);

              props.afterFunc({
                title: title,
                description: desc,
                minSelect: minSelect,
                offPercent: offPercent,
                buyers: props.package !== undefined ? props.package.buyers : 0,
                quizzes:
                  props.package !== undefined ? props.package.quizzes : 0,
                grade: {id: selectedGrade.id, name: selectedGrade.item},
                lesson:
                  selectedLesson === undefined
                    ? undefined
                    : {id: selectedLesson.id, name: selectedLesson.item},
                id: props.package !== undefined ? props.package.id : res,
              });
              props.setMode('list');
            }
          }}
          title={commonTranslator.confirm}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default Create;
