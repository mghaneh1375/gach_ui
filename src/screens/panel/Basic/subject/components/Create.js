import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import {showSuccess} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslate from '../../../../../tranlates/Common';
import Translate from '../../Translate';
import {createSubject, editSubject, getSubjects} from '../../Utility';

function Create(props) {
  const [name, setName] = useState(
    props.subject !== undefined ? props.subject.name : undefined,
  );
  const [description, setDescription] = useState(
    props.subject !== undefined ? props.subject.description : undefined,
  );
  const [lesson, setLesson] = useState(
    props.subject !== undefined ? props.subject.lesson.id : undefined,
  );
  const [grade, setGrade] = useState(
    props.subject !== undefined ? props.subject.grade.id : undefined,
  );
  const [easyPrice, setEasyPrice] = useState(
    props.subject !== undefined ? props.subject.easyPrice : undefined,
  );
  const [midPrice, setMidPrice] = useState(
    props.subject !== undefined ? props.subject.midPrice : undefined,
  );
  const [hardPrice, setHarPrice] = useState(
    props.subject !== undefined ? props.subject.hardPrice : undefined,
  );
  const [lessons, setLessons] = useState();
  const [showUploadPane, setShowUploadPane] = useState(false);

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
    <View>
      {showUploadPane && (
        <UploadFile
          setResult={res => {
            Promise.all([getSubjects()]).then(res => {
              showSuccess(commonTranslate.success);
              setShowUploadPane(false);

              if (res[0] !== null) {
                props.setSubjects(res[0]);
                props.setMode('list');
              }
            });
          }}
          url={routes.addBatchSubjects}
          token={props.token}
          multi={false}
          title={commonTranslate.subjectDefinition}
          toggleShow={() => setShowUploadPane(false)}
          maxFileSize={2}
          accept={['.xls', '.xlsx']}
        />
      )}
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        header={
          props.subject !== undefined
            ? commonTranslate.edit
            : commonTranslate.subjectDefinition
        }>
        <View>
          <PhoneView>
            <JustBottomBorderTextInput
              value={name}
              onChangeText={e => setName(e)}
              placeholder={commonTranslate.name}
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
            <JustBottomBorderSelect
              isHalf={true}
              placeholder={Translate.lessonName}
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

          <PhoneView style={{marginTop: 20}}>
            <JustBottomBorderTextInput
              isHalf={true}
              value={easyPrice}
              subText={Translate.easyPrice}
              onChangeText={e => setEasyPrice(e)}
              justNum={true}
              placeholder={Translate.easyPrice}
            />
            <JustBottomBorderTextInput
              isHalf={true}
              value={midPrice}
              subText={Translate.midPrice}
              onChangeText={e => setMidPrice(e)}
              justNum={true}
              placeholder={Translate.midPrice}
            />
            <JustBottomBorderTextInput
              isHalf={true}
              value={hardPrice}
              subText={Translate.hardPrice}
              onChangeText={e => setHarPrice(e)}
              justNum={true}
              placeholder={Translate.hardPrice}
            />
          </PhoneView>

          <JustBottomBorderTextInput
            value={description}
            onChangeText={e => setDescription(e)}
            multiline={true}
            style={{marginTop: 20}}
            placeholder={commonTranslate.desc}
          />

          <PhoneView style={{alignSelf: 'flex-end'}}>
            <CommonButton
              theme={'dark'}
              title={commonTranslate.addBatch}
              onPress={() => setShowUploadPane(true)}
            />
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                let res;
                let data = {
                  name: name,
                  description: description,
                  midPrice: midPrice,
                  hardPrice: hardPrice,
                  easyPrice: easyPrice,
                };

                if (props.subject !== undefined)
                  res = await editSubject(props.subject.id, props.token, {
                    ...data,
                    ...{gradeId: grade, lessonId: lesson},
                  });
                else
                  res = await createSubject(props.token, grade, lesson, data);

                props.setLoading(false);
                if (res !== null) {
                  let selectedGrade = props.grades.find(
                    elem => elem.id === grade,
                  );
                  let selectedLesson = lessons.find(elem => elem.id === lesson);

                  props.afterFunc({
                    name: name,
                    description: description,
                    midPrice: midPrice,
                    hardPrice: hardPrice,
                    easyPrice: easyPrice,
                    grade: {id: selectedGrade.id, name: selectedGrade.item},
                    lesson: {id: selectedLesson.id, name: selectedLesson.item},
                    code:
                      props.subject !== undefined
                        ? props.subject.code
                        : res.code,
                    id: props.subject !== undefined ? props.subject.id : res.id,
                  });
                  props.setMode('list');
                }
              }}
              title={commonTranslate.confirm}
            />
          </PhoneView>
        </View>
      </CommonWebBox>
    </View>
  );
}

export default Create;
