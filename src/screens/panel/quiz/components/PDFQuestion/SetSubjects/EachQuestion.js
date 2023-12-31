import React from 'react';
import {MyView, PhoneView, SimpleText} from '../../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../../../styles/Common/Styles';
import {showError} from '../../../../../../services/Utility';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../../../translator/Common';
import {getLessons} from '../../../../../advisorPanel/Schedule/components/Utility';
import {getSubjectsKeyVals} from '../../../../question/components/Utility';
import {dispatchSetSubjectContext, setSubjectContext} from './Context';

export default function EachQuestion({question, setQuestion, setLoading}) {
  const [mark, setMark] = React.useState(question.mark);
  const [choicesCount, setChoicesCount] = React.useState(question.choicesCount);
  const [subject, setSubject] = React.useState(question.subject);
  const [ans, setAns] = React.useState(question.ans);
  const [saved, setSaved] = React.useState(false);
  const [grade, setGrade] = React.useState(question.grade);
  const [lesson, setLesson] = React.useState(question.lesson);

  const [lessonsKeyVals, setLessonsKeyVals] = React.useState();
  const [subjectsKeyVals, setSubjectsKeyVals] = React.useState();
  const [isWorking, setIsWorking] = React.useState(false);

  const useGlobalState = () => [
    React.useContext(setSubjectContext),
    React.useContext(dispatchSetSubjectContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (
      mark === undefined ||
      ans === undefined ||
      subject === undefined ||
      choicesCount === undefined
    )
      return;

    setQuestion({
      qNo: question.qNo,
      mark: mark,
      ans: ans,
      subject: subject,
      choicesCount: choicesCount,
    });
    setSaved(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ans, choicesCount, mark, subject]);

  React.useEffect(() => {
    if (state.currGrade === undefined || grade !== undefined) return;
    setGrade(state.currGrade);
  }, [grade, state.currGrade]);

  React.useEffect(() => {
    if (state.currGrade === undefined && grade !== undefined)
      dispatch({currGrade: grade});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, state.currGrade]);

  React.useEffect(() => {
    if (state.currLesson === undefined || lesson !== undefined) return;
    setLesson(state.currLesson);
  }, [lesson, state.currLesson]);

  React.useEffect(() => {
    if (state.currLesson === undefined && lesson !== undefined)
      dispatch({currLesson: lesson});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, state.currLesson]);

  const fetchLessons = React.useCallback(() => {
    if (isWorking || state.grades === undefined) return;

    let selectedGrade = state.grades.find(e => e.id === grade);

    if (selectedGrade === undefined || selectedGrade.lessons !== undefined) {
      if (selectedGrade.lessons !== undefined)
        setLessonsKeyVals(selectedGrade.lessons);
      return;
    }

    setIsWorking(true);
    setLoading(true);

    Promise.all([getLessons(grade, selectedGrade.isOlympiad)]).then(res => {
      setLoading(false);

      if (res[0] === null) return;

      selectedGrade.lessons = res[0].map(e => {
        return {
          id: e.id,
          item: e.name,
        };
      });

      setLessonsKeyVals(selectedGrade.lessons);
      dispatch({
        grades: state.grades.map(e => {
          if (e.id === grade) return selectedGrade;
          return e;
        }),
      });
      setIsWorking(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, isWorking]);

  React.useEffect(() => {
    if (grade == undefined) return;
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, isWorking]);

  React.useEffect(() => {
    if (lesson == undefined || isWorking || lessonsKeyVals === undefined)
      return;

    const fetchSubjects = async selectedLesson => {
      setLoading(true);

      let res = await getSubjectsKeyVals(lesson);

      setLoading(false);

      if (res === null) return;

      selectedLesson.subjects = res.map(e => {
        return {
          id: e.id,
          item: e.name,
        };
      });

      dispatch({
        grades: state.grades.map(e => {
          if (e.id === grade) {
            let selectedGrade = e;
            selectedGrade.lessons = selectedGrade.lessons.map(ee => {
              if (ee.id === lesson) return selectedLesson;
              return ee;
            });
            return selectedGrade;
          }
          return e;
        }),
      });

      setSubjectsKeyVals(selectedLesson.subjects);
    };

    let selectedLesson = lessonsKeyVals.find(e => e.id === lesson);

    if (selectedLesson === undefined || selectedLesson.subjects !== undefined) {
      if (selectedLesson?.subjects !== undefined)
        setSubjectsKeyVals(selectedLesson.subjects);
      return;
    }
    setIsWorking(true);
    Promise.all([fetchSubjects(selectedLesson)]).then(res => {
      setIsWorking(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, lessonsKeyVals, isWorking]);

  return (
    <MyView
      style={{
        border: '1px solid',
        borderRadius: 12,
        padding: 10,
        backgroundColor: saved ? 'rgb(113 196 150)' : 'rgb(226 123 129)',
      }}>
      <SimpleText
        text={'شماره سوال: ' + (question.qNo + 1)}
        style={styles.BlueBold}
      />
      <PhoneView style={styles.gap10}>
        <JustBottomBorderTextInput
          style={{color: 'black'}}
          placeholder={'نمره سوال'}
          subText={'نمره سوال'}
          justNum={true}
          value={mark}
          onChangeText={e => setMark(e)}
        />
        <JustBottomBorderTextInput
          style={{color: 'black'}}
          placeholder={'تعداد گزینه'}
          subText={'تعداد گزینه'}
          justNum={true}
          value={choicesCount}
          onChangeText={e => {
            if (e.length === 0) {
              setChoicesCount(undefined);
              return;
            }
            if (e < 2 || e > 7) {
              showError('تعداد گزینه باید حداقل 2 و حداکثر 7 باشد');
              return;
            }
            setChoicesCount(e);
          }}
        />
        <JustBottomBorderTextInput
          style={{color: 'black'}}
          placeholder={'گزینه صحیح'}
          subText={'گزینه صحیح'}
          justNum={true}
          value={ans}
          onChangeText={e => {
            if (e.length === 0) {
              setAns(undefined);
              return;
            }
            if (e < 1 || e > choicesCount) {
              showError('گزینه صحیح نامعتبر است');
              return;
            }
            setAns(e);
          }}
        />
        <JustBottomBorderSelect
          style={{color: 'black'}}
          placeholder={commonTranslator.grade}
          subText={commonTranslator.grade}
          setter={setGrade}
          values={state.grades}
          value={state.grades.find(e => e.id === grade)}
        />

        {grade != undefined && lessonsKeyVals !== undefined && (
          <JustBottomBorderSelect
            style={{color: 'black'}}
            placeholder={commonTranslator.lesson}
            subText={commonTranslator.lesson}
            setter={setLesson}
            values={lessonsKeyVals}
            value={lessonsKeyVals.find(e => e.id === lesson)}
          />
        )}

        {lesson != undefined && subjectsKeyVals !== undefined && (
          <JustBottomBorderSelect
            style={{color: 'black'}}
            placeholder={commonTranslator.subject}
            subText={commonTranslator.subject}
            setter={setSubject}
            values={subjectsKeyVals}
            value={subjectsKeyVals.find(e => e.id === subject)}
          />
        )}
      </PhoneView>
    </MyView>
  );
}
