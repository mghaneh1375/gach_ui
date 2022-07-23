import {View} from 'react-native-web';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../tranlates/Common';
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
    props.package !== undefined ? props.package.lesson.id : undefined,
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
      <View>
        <PhoneView>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.title}
            value={title}
            onChangeText={e => changeText(e, setTitle)}
          />
          <JustBottomBorderTextInput
            placeholder={Translate.minSelect}
            value={minSelect}
            justNum={true}
            onChangeText={e => changeText(e, setMinSelect)}
          />
          <JustBottomBorderTextInput
            placeholder={Translate.mizanTakhfif}
            value={offPercent}
            justNum={true}
            onChangeText={e => changeText(e, setOffPercent)}
          />
        </PhoneView>
        <PhoneView style={{marginTop: 25}}>
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={commonTranslator.grade}
            setter={setGrade}
            value={props.grades.find(elem => {
              return elem.id === grade;
            })}
            values={props.grades}
          />
          <JustBottomBorderSelect
            isHalf={true}
            placeholder={commonTranslator.lesson}
            setter={setLesson}
            value={
              lessons !== undefined
                ? lessons.find(elem => {
                    return elem.id === lesson;
                  })
                : ''
            }
            values={lessons !== undefined ? lessons : []}
          />
        </PhoneView>
        <View style={{marginTop: 25}}>
          <JustBottomBorderTextInput
            multiline={true}
            subText={commonTranslator.optional}
            placeholder={commonTranslator.desc}
            value={desc}
            onChangeText={e => changeText(e, setDesc)}
          />
        </View>
        <View>
          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              let res;
              let data = {
                title: title,
                description: desc,
                gradeId: grade,
                lessonId: lesson,
                minSelect: minSelect,
                offPercent: offPercent,
              };

              if (props.package !== undefined)
                res = await editPackage(props.package.id, props.token, data);
              else res = await createPackage(props.token, data);

              props.setLoading(false);
              if (res !== null) {
                let selectedGrade = props.grades.find(
                  elem => elem.id === grade,
                );
                let selectedLesson = lessons.find(elem => elem.id === lesson);

                props.afterFunc({
                  title: title,
                  description: desc,
                  minSelect: minSelect,
                  offPercent: offPercent,
                  buyers:
                    props.package !== undefined ? props.package.buyers : 0,
                  quizzes:
                    props.package !== undefined ? props.package.quizzes : 0,
                  grade: {id: selectedGrade.id, name: selectedGrade.item},
                  lesson: {id: selectedLesson.id, name: selectedLesson.item},
                  id: props.package !== undefined ? props.package.id : res,
                });
                props.setMode('list');
              }
            }}
            title={commonTranslator.confirm}
          />
        </View>
      </View>
    </CommonWebBox>
  );
}

export default Create;
