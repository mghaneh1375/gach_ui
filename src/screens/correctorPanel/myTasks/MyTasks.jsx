import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility.js';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {CommonWebBox, PhoneView} from '@/styles/CommonComponents.jsx';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {styles} from '@/styles/common/styles.js';
import QuestionCard from '../../panel/quiz/components/correctors/QuestionCard.jsx';
import StudentCard from '../../panel/quiz/components/correctors/StudentCard.jsx';
import Ops from './components/Ops.jsx';
import columns from './tableStructure';
function MyTasks(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const [showOps, setShowOps] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState();
  const [taskMode, setTaskMode] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const fetchData = React.useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(routes.getMyTasks, 'get', undefined, 'data', state.token),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setData(res[0]);
    });
  }, [props, state.token, dispatch]);
  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);
  const handleOp = idx => {
    setSelectedQuiz(data[idx]);
    setShowOps(true);
  };
  const getMyStudents = React.useCallback(() => {
    if (isWorking || selectedQuiz === undefined || myStudents !== undefined)
      return;
    setIsWorking(true);
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.getMyMarkList +
          selectedQuiz.mode +
          '/' +
          selectedQuiz.id +
          '?taskMode=student',
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setMyStudents(res[0]);
      setIsWorking(false);
    });
  }, [isWorking, dispatch, props, selectedQuiz, state.token, myStudents]);
  const getMyQuestions = React.useCallback(() => {
    if (isWorking || selectedQuiz === undefined || myQuestions !== undefined)
      return;
    setIsWorking(true);
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.getMyMarkList +
          selectedQuiz.mode +
          '/' +
          selectedQuiz.id +
          '?taskMode=question',
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setMyQuestions(res[0]);
      setIsWorking(false);
    });
  }, [isWorking, dispatch, props, selectedQuiz, state.token, myQuestions]);
  const [myStudents, setMyStudents] = useState();
  const [myQuestions, setMyQuestions] = useState();
  React.useEffect(() => {
    if (taskMode == undefined) return;
    if (taskMode === 'studentList') getMyStudents();
    if (taskMode === 'questionList') getMyQuestions();
  }, [taskMode, getMyStudents, getMyQuestions]);
  return (
    <>
      {taskMode === undefined && !showOps && (
        <CommonWebBox header={'کارهای من'}>
          {data !== undefined && (
            <CommonDataTable
              excel={false}
              pagination={false}
              handleOp={handleOp}
              columns={columns}
              data={data}
            />
          )}
        </CommonWebBox>
      )}

      {showOps && (
        <Ops
          changeMode={new_mode => {
            setTaskMode(new_mode);
            setShowOps(false);
          }}
          toggleShowPopUp={() => setShowOps(false)}
          selectedQuiz={selectedQuiz}
        />
      )}
      {taskMode !== undefined &&
        taskMode === 'studentList' &&
        myStudents !== undefined && (
          <CommonWebBox
            header={selectedQuiz.title}
            backBtn={true}
            onBackClick={() => setTaskMode(undefined)}>
            <PhoneView
              style={{
                ...styles.gap10,
              }}>
              {myStudents.map((elem, index) => {
                return (
                  <StudentCard
                    showAnswerSheet={() =>
                      window.open(
                        '/showAnswerSheet/' +
                          selectedQuiz.mode +
                          '/' +
                          selectedQuiz.id +
                          '/student/' +
                          elem.student.id,
                        '_blank',
                      )
                    }
                    key={index}
                    elem={elem}
                  />
                );
              })}
            </PhoneView>
          </CommonWebBox>
        )}
      {taskMode !== undefined &&
        taskMode === 'questionList' &&
        myQuestions !== undefined && (
          <CommonWebBox
            header={selectedQuiz.title}
            backBtn={true}
            onBackClick={() => setTaskMode(undefined)}>
            <PhoneView
              style={{
                ...styles.gap10,
              }}>
              {myQuestions.map((elem, index) => {
                return (
                  <QuestionCard
                    showAnswerSheet={() =>
                      window.open(
                        '/showAnswerSheet/' +
                          selectedQuiz.mode +
                          '/' +
                          selectedQuiz.id +
                          '/question/' +
                          elem.id,
                        '_blank',
                      )
                    }
                    key={index}
                    elem={elem}
                  />
                );
              })}
            </PhoneView>
          </CommonWebBox>
        )}
    </>
  );
}
export default MyTasks;
