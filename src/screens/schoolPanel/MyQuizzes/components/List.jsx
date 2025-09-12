import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import {getQuizzes} from '../../../panel/quiz/components/utility';
import translator from '../../../panel/quiz/translator';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context.jsx';
import Ops from './Ops.jsx';
import columns from './tableStructure';
const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();
  React.useEffect(() => {
    if (isWorking || state.quizzes !== undefined) return;
    props.setLoading(true);
    setIsWorking(true);
    Promise.all([
      getQuizzes(
        props.token,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'school',
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      dispatch({
        quizzes: res[0],
      });
      setIsWorking(false);
    });
  }, [props, dispatch, isWorking, state.quizzes]);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    dispatch({
      selectedQuiz: state.quizzes[idx],
    });
    setShowOpPopUp(true);
  };
  const [showList, setShowList] = useState(true);
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
          navigate={props.navigate}
          user={props.user}
          setShowList={setShowList}
        />
      )}
      {showList && (
        <CommonWebBox
          header={translator.quizes}
          addBtn={true}
          onAddClick={() => props.setMode('create')}>
          <MyView>
            {state.quizzes !== undefined && (
              <CommonDataTable
                columns={columns}
                data={state.quizzes}
                setData={newData => {
                  dispatch({
                    quizzes: newData,
                  });
                }}
                handleOp={handleOp}
                token={props.token}
                setLoading={props.setLoading}
                removeUrl={routes.removeSchoolQuiz}
              />
            )}
          </MyView>
        </CommonWebBox>
      )}
    </MyView>
  );
};
export default List;
