import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import SelectFromMyStudents from '../../../../../components/web/SelectFromMyStudents';
import {showSuccess} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import StudentAnswerSheet from '../../../../panel/quiz/components/AnswerSheet/StudentAnswerSheet';
import {getAnswerSheets} from '../../../../panel/quiz/components/Utility';
import translator from '../../../../panel/quiz/Translator';
import {dispatchMyQuizzesContext, myQuizzesContext} from '../Context';
import columns from './TableStructure';

const Students = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedSudent, setSelectedStudent] = useState(undefined);

  const setStudents = newList => {
    state.selectedQuiz.students = newList;
    state.selectedQuiz.studentsCount = newList.length;
    state.selectedQuiz.recp = undefined;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
  };

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const fetchStudents = React.useCallback(() => {
    if (isWorking || state.selectedQuiz.students !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getParticipants + 'school/' + state.selectedQuiz.id,
        'get',
        undefined,
        'students',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      state.selectedQuiz.students = res[0];
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.selectedQuiz]);

  React.useEffect(() => {
    if (
      state.selectedQuiz !== undefined &&
      state.selectedQuiz.students === undefined
    )
      fetchStudents();
  }, [state.selectedQuiz, fetchStudents]);

  const handleOp = idx => {
    setSelectedStudent(state.selectedQuiz.students[idx]);
    toggleShowOpPopUp();
  };

  const [studentIdx, setStudentIdx] = useState();
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [data, setData] = useState();

  React.useEffect(() => {
    setData(state.selectedQuiz.students);
  }, [state.selectedQuiz.students]);

  const prepareShowAnswerSheet = async () => {
    if (state.selectedQuiz.answer_sheets === undefined) {
      props.setLoading(true);
      let res = await getAnswerSheets(
        state.selectedQuiz.id,
        'school',
        props.token,
      );

      props.setLoading(false);

      if (res !== null) {
        state.selectedQuiz.answer_sheet = res.answers;
        state.selectedQuiz.answer_sheets = res.students;
        dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      } else return;
    }

    state.selectedQuiz.answer_sheets.forEach((elem, index) => {
      if (elem.student.id == selectedSudent.id) {
        let data = state.selectedQuiz.answer_sheet.map((elem, idx) => {
          elem.studentAns =
            state.selectedQuiz.answer_sheets[index].answers[idx];
          return elem;
        });

        dispatch({
          showAnswers: true,
          showStdAnswers: true,
          allowChangeStdAns: true,
          allowChangeAns: false,
          wanted_answer_sheet: data,
          new_std_answer_sheet: state.selectedQuiz.answer_sheets[
            index
          ].answers.map(elem => {
            return elem;
          }),
        });
        setStudentIdx(index);
        setShowOpPopUp(false);
        setShowAnswerSheet(true);
      }
    });
  };

  const [showSelectStudentsPane, setShowSelectStudentsPane] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState();

  const addStudentsToQuiz = React.useCallback(() => {
    if (
      isWorking ||
      selectedStudents === undefined ||
      selectedStudents.length === 0
    )
      return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.forceRegistry + 'school/' + state.selectedQuiz.id,
        'put',
        {
          items: selectedStudents.map(elem => {
            return elem.NID;
          }),
          paid: 0,
        },
        ['excepts', 'doneIds'],
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) return;

      showSuccess(res[0].excepts);
      let addedStudents = state.myStudents.filter(e => {
        return res[0].doneIds.indexOf(e.id) !== -1;
      });

      state.selectedQuiz.students = addedStudents.concat(
        state.selectedQuiz.students,
      );

      state.selectedQuiz.studentsCount = state.selectedQuiz.students.length;
      state.selectedQuiz.recp = undefined;
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});

      setSelectedStudents(undefined);
      setIsWorking(false);
    });
  }, [
    props,
    isWorking,
    dispatch,
    state.selectedQuiz,
    state.myStudents,
    selectedStudents,
  ]);

  React.useEffect(() => {
    if (selectedStudents === undefined || selectedStudents.length === 0) return;
    addStudentsToQuiz();
  }, [selectedStudents, addStudentsToQuiz]);

  return (
    <MyView>
      {showAnswerSheet && (
        <StudentAnswerSheet
          selectedAnswerSheetIdx={studentIdx}
          setLoading={props.setLoading}
          onBackClick={() => setShowAnswerSheet(false)}
          token={props.token}
          state={state}
          dispatch={dispatch}
        />
      )}
      {showSelectStudentsPane && (
        <SelectFromMyStudents
          token={props.token}
          setLoading={props.setLoading}
          myStudents={state.myStudents}
          setMyStudents={myStudents => dispatch({myStudents: myStudents})}
          setSelectedStudents={selected => setSelectedStudents(selected)}
          toggleShowPopUp={() => setShowSelectStudentsPane(false)}
          title={'افزودن دانش آموز/دانش آموزان به آزمون'}
        />
      )}
      {showOpPopUp && (
        <LargePopUp
          toggleShowPopUp={toggleShowOpPopUp}
          title={state.selectedQuiz.title}>
          <PhoneView style={{gap: 20}}>
            <CommonButton
              onPress={() => prepareShowAnswerSheet()}
              dir={'rtl'}
              theme={'transparent'}
              title={'مشاهده پاسخ برگ'}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {!showAnswerSheet && (
        <CommonWebBox
          btn={
            <PhoneView>
              {state.selectedQuiz.status === 'init' && (
                <CommonButton
                  title={'انتخاب دانش آموزان'}
                  theme={'dark'}
                  onPress={() => setShowSelectStudentsPane(true)}
                />
              )}

              <CommonButton
                title={'بازگشت'}
                onPress={() => props.setMode('list')}
              />
            </PhoneView>
          }
          header={translator.studentsListInQuiz}>
          {data !== undefined && (
            <CommonDataTable
              columns={columns}
              data={data}
              handleOp={handleOp}
              setLoading={props.setLoading}
              token={props.token}
              setData={setStudents}
              removeUrl={
                state.selectedQuiz.status === 'init'
                  ? routes.forceDeportation + 'school/' + state.selectedQuiz.id
                  : undefined
              }
            />
          )}
        </CommonWebBox>
      )}
    </MyView>
  );
};

export default Students;
