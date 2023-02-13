import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonWebBox, PhoneView} from '../../../styles/Common';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import {styles} from '../../../styles/Common/Styles';
import StudentCard from '../../panel/quiz/components/Correctors/StudentCard';
import Ops from './components/Ops';
import columns from './TableStructure';

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
    dispatch({loading: true});

    Promise.all([
      generalRequest(routes.getMyTasks, 'get', undefined, 'data', state.token),
    ]).then(res => {
      dispatch({loading: false});

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
    if (
      isWorking ||
      selectedQuiz === undefined ||
      selectedQuiz.myStudents !== undefined
    )
      return;

    setIsWorking(true);
    dispatch({loading: true});

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
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      setMyStudents(res[0]);

      // setIsWorking(false);
    });
  }, [isWorking, dispatch, props, selectedQuiz, state.token]);

  const [myStudents, setMyStudents] = useState();

  React.useEffect(() => {
    console.log(selectedQuiz);
  }, [selectedQuiz]);

  React.useEffect(() => {
    if (taskMode == undefined) return;
    if (taskMode === 'studentList') getMyStudents();
  }, [taskMode, getMyStudents]);

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
            <PhoneView style={{...styles.gap10}}>
              {myStudents.map((elem, index) => {
                return (
                  <StudentCard
                    showAnswerSheet={() =>
                      window.open(
                        '/showAnswerSheet/' +
                          selectedQuiz.generalMode +
                          '/' +
                          selectedQuiz.id +
                          '/' +
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
