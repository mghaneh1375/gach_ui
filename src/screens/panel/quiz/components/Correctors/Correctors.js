import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import {dispatchQuizContext, quizContext} from '../Context';
import {
  addCorrector,
  fetchCorrector,
  fetchCorrectors,
  getQuestions,
} from '../Utility';
import columns from './TableStructure';
import commonTranslator from '../../../../../translator/Common';
import Ops from './Ops';
import StudentCard from './StudentCard';
import {generalRequest} from '../../../../../API/Utility';
import {styles} from '../../../../../styles/Common/Styles';
import {showSuccess} from '../../../../../services/Utility';
import QuestionCard from './QuestionCard';

function Correctors(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showOpPane, setShowOpPane] = useState(false);

  const fetchData = React.useCallback(() => {
    if (state.selectedQuiz.correctors !== undefined || isWorking) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      fetchCorrectors(
        state.selectedQuiz.id,
        props.quizGeneralMode,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      state.selectedQuiz.correctors = res[0];
      dispatch({selectedQuiz: state.selectedQuiz});
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.selectedQuiz]);

  React.useEffect(() => {
    if (state.selectedQuiz.correctors !== undefined) return;
    fetchData();
  }, [state.selectedQuiz.id, state.selectedQuiz.correctors, fetchData]);

  const handleOp = idx => {
    dispatch({selectedCorrector: state.selectedQuiz.correctors[idx]});
    setShowOpPane(true);
  };

  const [showAddPane, setShowAddPane] = useState(false);
  const [NID, setNID] = useState();
  const [taskMode, setTaskMode] = useState();

  const getCorrector = React.useCallback(() => {
    if (
      (state.selectedCorrector.allQuestions !== undefined &&
        taskMode === 'studentList' &&
        state.selectedCorrector.myStudents !== undefined) ||
      (state.selectedCorrector.allQuestions !== undefined &&
        taskMode === 'questionList' &&
        state.selectedCorrector.myQuestions !== undefined) ||
      isWorking
    )
      return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all(
      taskMode === 'studentList'
        ? [
            fetchCorrector(
              state.selectedQuiz.id,
              state.selectedQuiz.generalMode,
              state.selectedCorrector.id,
              props.token,
            ),
            generalRequest(
              routes.getParticipants +
                state.selectedQuiz.generalMode +
                '/' +
                state.selectedQuiz.id,
              'get',
              undefined,
              'students',
              props.token,
            ),
          ]
        : [
            fetchCorrector(
              state.selectedQuiz.id,
              state.selectedQuiz.generalMode,
              state.selectedCorrector.id,
              props.token,
            ),
            getQuestions(
              props.token,
              state.selectedQuiz.id,
              state.selectedQuiz.generalMode,
            ),
          ],
    ).then(res => {
      props.setLoading(false);

      if (res[0] === null || res[1] === null) {
        setTaskMode(undefined);
        return;
      }

      state.selectedCorrector.allQuestions = res[0].allQuestions;
      state.selectedCorrector.allMarked = res[0].allMarked;
      if (taskMode === 'studentList') {
        let tmp = state.selectedQuiz;
        tmp.students = res[1];

        let myStudents = [];

        res[1].forEach(elem => {
          if (
            elem.correctorId !== undefined &&
            elem.correctorId === state.selectedCorrector.id
          )
            myStudents.push(elem.id);
        });

        state.selectedCorrector.myStudents = myStudents;
        dispatch({selectedQuiz: tmp});
      } else {
        let tmp = state.selectedQuiz;
        tmp.questions = res[1];

        let myQuestions = [];

        res[1].forEach(elem => {
          if (
            elem.correctorId !== undefined &&
            elem.correctorId === state.selectedCorrector.id
          )
            myQuestions.push(elem.id);
        });

        state.selectedCorrector.myQuestions = myQuestions;
        dispatch({selectedQuiz: tmp});
      }

      dispatch({selectedCorrector: state.selectedCorrector});
      setIsWorking(false);
    });
  }, [
    state.selectedCorrector,
    isWorking,
    dispatch,
    props,
    state.selectedQuiz,
    taskMode,
  ]);

  React.useEffect(() => {
    if (taskMode == undefined) return;

    getCorrector();
  }, [taskMode, getCorrector]);

  return (
    <>
      {taskMode !== undefined &&
        taskMode == 'studentList' &&
        state.selectedQuiz.students !== undefined &&
        state.selectedCorrector.myStudents !== undefined && (
          <CommonWebBox
            header={state.selectedCorrector.name}
            backBtn={true}
            onBackClick={() => setTaskMode(undefined)}>
            <SimpleText
              text={
                'تعداد کل سوالات اختصاص یافته: ' +
                state.selectedCorrector.allQuestions
              }
            />
            <SimpleText
              text={
                'تعداد کل سوالات تصحیح شده: ' +
                state.selectedCorrector.allMarked
              }
            />
            <PhoneView style={{...styles.gap10}}>
              {state.selectedQuiz.students.map((elem, index) => {
                return (
                  <StudentCard
                    onPress={new_status => {
                      let tmp;
                      if (new_status) {
                        tmp = [];
                        state.selectedCorrector.myStudents.forEach(e => {
                          tmp.push(e);
                        });

                        tmp.push(elem.id);
                      } else {
                        tmp = state.selectedCorrector.myStudents.filter(e => {
                          return elem.id !== e;
                        });
                      }

                      state.selectedCorrector.myStudents = tmp;
                      dispatch({selectedCorrector: state.selectedCorrector});
                    }}
                    showAnswerSheet={() =>
                      window.open(
                        '/showAnswerSheet/' +
                          state.selectedQuiz.generalMode +
                          '/' +
                          state.selectedQuiz.id +
                          '/student/' +
                          elem.id,
                        '_blank',
                      )
                    }
                    correctorId={state.selectedCorrector.id}
                    key={index}
                    elem={elem}
                  />
                );
              })}
            </PhoneView>
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.setCorrectorByStudentMode +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id +
                    '/' +
                    state.selectedCorrector.id,
                  'put',
                  {students: state.selectedCorrector.myStudents},
                  ['excepts', 'doneIds'],
                  props.token,
                );
                props.setLoading(false);
                if (res != null) {
                  showSuccess(res.excepts);
                  setTaskMode(undefined);
                  state.selectedQuiz.correctors = undefined;
                  dispatch({selectedQuiz: state.selectedQuiz});
                }
              }}
              theme={'dark'}
              title={'نهایی سازی'}
            />
          </CommonWebBox>
        )}
      {taskMode !== undefined &&
        taskMode == 'questionList' &&
        state.selectedQuiz.questions !== undefined &&
        state.selectedCorrector.myQuestions !== undefined && (
          <CommonWebBox
            header={state.selectedCorrector.name}
            backBtn={true}
            onBackClick={() => setTaskMode(undefined)}>
            <SimpleText
              text={
                'تعداد کل سوالات اختصاص یافته: ' +
                state.selectedCorrector.allQuestions
              }
            />
            <SimpleText
              text={
                'تعداد کل سوالات تصحیح شده: ' +
                state.selectedCorrector.allMarked
              }
            />
            <PhoneView style={{...styles.gap10}}>
              {state.selectedQuiz.questions.map((elem, index) => {
                return (
                  <QuestionCard
                    onPress={new_status => {
                      let tmp;
                      if (new_status) {
                        tmp = [];
                        state.selectedCorrector.myQuestions.forEach(e => {
                          tmp.push(e);
                        });

                        tmp.push(elem.id);
                      } else {
                        tmp = state.selectedCorrector.myQuestions.filter(e => {
                          return elem.id !== e;
                        });
                      }

                      state.selectedCorrector.myQuestions = tmp;
                      dispatch({selectedCorrector: state.selectedCorrector});
                    }}
                    showAnswerSheet={() => {
                      elem.correctorId !== undefined &&
                      elem.correctorId === state.selectedCorrector.id
                        ? window.open(
                            '/showAnswerSheet/' +
                              state.selectedQuiz.generalMode +
                              '/' +
                              state.selectedQuiz.id +
                              '/question/' +
                              elem.id,
                            '_blank',
                          )
                        : undefined;
                    }}
                    isMyTask={
                      elem.correctorId !== undefined &&
                      elem.correctorId === state.selectedCorrector.id
                    }
                    correctorId={state.selectedCorrector.id}
                    key={index}
                    elem={elem}
                  />
                );
              })}
            </PhoneView>
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.setCorrectorByQuestionMode +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id +
                    '/' +
                    state.selectedCorrector.id,
                  'put',
                  {questions: state.selectedCorrector.myQuestions},
                  ['excepts', 'doneIds'],
                  props.token,
                );
                props.setLoading(false);
                if (res != null) {
                  showSuccess(res.excepts);
                  setTaskMode(undefined);
                  state.selectedQuiz.correctors = undefined;
                  dispatch({selectedQuiz: state.selectedQuiz});
                }
              }}
              theme={'dark'}
              title={'نهایی سازی'}
            />
          </CommonWebBox>
        )}
      {showOpPane && (
        <Ops
          changeMode={mode => {
            setShowOpPane(false);
            setTaskMode(mode);
          }}
          toggleShowPopUp={() => setShowOpPane(false)}
        />
      )}
      {showAddPane && (
        <CommonWebBox
          header={translator.addCorrector}
          onBackClick={() => setShowAddPane(false)}
          backBtn={true}>
          <JustBottomBorderTextInput
            value={NID}
            onChangeText={e => setNID(e)}
            subText={commonTranslator.NID}
            placeholder={commonTranslator.NID}
          />
          <CommonButton
            onPress={async () => {
              let res = await addCorrector(
                NID,
                state.selectedQuiz.id,
                state.selectedQuiz.generalMode,
                props.token,
              );
              if (res !== null) {
                let tmp = state.selectedQuiz.correctors;
                tmp.push(res);
                state.selectedQuiz.correctors = tmp;
                dispatch({
                  selectedQuiz: state.selectedQuiz,
                  needUpdate: true,
                });
                setShowAddPane(false);
                setNID('');
              }
            }}
            theme={'dark'}
            title={translator.addCorrector}
          />
        </CommonWebBox>
      )}
      {!showAddPane && taskMode === undefined && !showOpPane && (
        <CommonWebBox
          header={translator.correctors}
          backBtn={true}
          addBtn={true}
          onAddClick={() => setShowAddPane(true)}
          onBackClick={() => props.setMode('list')}>
          {state.selectedQuiz.correctors !== undefined && (
            <CommonDataTable
              columns={columns}
              data={state.selectedQuiz.correctors}
              handleOp={handleOp}
              setLoading={props.setLoading}
              token={props.token}
              setData={newData => {
                state.selectedQuiz.correctors = newData;
                dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
              }}
              removeUrl={
                routes.removeCorrectors +
                state.selectedQuiz.generalMode +
                '/' +
                state.selectedQuiz.id
              }
            />
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default Correctors;
