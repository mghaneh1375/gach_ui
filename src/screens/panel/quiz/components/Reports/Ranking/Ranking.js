import React, {useState, useRef, useCallback} from 'react';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {getRanking} from '../../Utility';
import {CommonWebBox} from '../../../../../../styles/Common';
import columns from './Columns';
import {quizContext, dispatchQuizContext} from '../../Context';

function Ranking(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState();

  // const fetchQuiz = React.useCallback(() => {
  //   console.log(state.quizzes);
  // }, [state.quizzes]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     fetchQuiz();
  //   }, [2000]);
  // }, [fetchQuiz]);

  // React.useEffect(() => {
  //   console.log(state.quizzes);
  //   if (isWorking) return;
  //   if (state.quizzes === undefined) {
  //     setIsWorking(true);
  //     return;
  //   }
  // }, [state.quizzes, isWorking]);

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) return;

    if (isWorking || state.selectedQuiz.ranking !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      getRanking(
        props.token,
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }
      state.selectedQuiz.ranking = res[0];
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      setIsWorking(false);
    });
  }, [dispatch, state.selectedQuiz, props, isWorking]);

  const handleOp = idx => {
    dispatch({selectedStudentId: state.selectedQuiz.ranking[idx].id});
    props.setMode('karname');
  };

  return (
    <CommonWebBox
      header={'نتایج'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {state.selectedQuiz !== undefined &&
        state.selectedQuiz.ranking !== undefined && (
          <CommonDataTable
            columns={columns}
            data={state.selectedQuiz.ranking}
            handleOp={handleOp}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
          />
        )}
    </CommonWebBox>
  );
}

export default Ranking;
