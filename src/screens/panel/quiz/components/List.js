import {CommonWebBox, MyView} from '../../../../styles/Common';
import translator from '../Translator';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import React, {useState} from 'react';
import Ops from './Ops';
import {routes} from '../../../../API/APIRoutes';
import {dispatchQuizContext, quizContext} from './Context';
import columns, {
  columnsForOpenQuiz,
  columnsForContentQuiz,
  columnsForOnlineStanding,
} from './TableStructure';
import {
  getContentQuizzes,
  getEscapeQuizzes,
  getOnlineStandingQuizzes,
  getOpenQuizzes,
  getQuizzes,
} from './Utility';
import ProSearch from './ProSearch';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [isWorking, setIsWorking] = useState(false);

  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (isWorking || state.quizzes !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      props.generalMode !== undefined && props.generalMode === 'openQuiz'
        ? getOpenQuizzes(props.token)
        : props.generalMode !== undefined &&
          props.generalMode === 'onlineStanding'
        ? getOnlineStandingQuizzes(props.token)
        : props.generalMode === 'escape'
        ? getEscapeQuizzes(props.token)
        : props.generalMode !== undefined && props.generalMode === 'contentQuiz'
        ? getContentQuizzes(props.token)
        : getQuizzes(props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      dispatch({quizzes: res[0]});
      setIsWorking(false);
    });
  }, [props, dispatch, isWorking, state.quizzes]);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const handleOp = idx => {
    dispatch({selectedQuiz: state.quizzes[idx]});
    toggleShowOpPopUp();
  };

  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
          navigate={props.navigate}
        />
      )}
      <CommonWebBox
        header={translator.quizes}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <MyView>
          {(props.generalMode === undefined ||
            props.generalMode !== 'contentQuiz') && (
            <ProSearch
              generalMode={props.generalMode}
              token={props.token}
              setLoading={props.setLoading}
            />
          )}

          {state.quizzes !== undefined && (
            <CommonDataTable
              columns={
                props.generalMode !== undefined &&
                props.generalMode === 'openQuiz'
                  ? columnsForOpenQuiz
                  : props.generalMode !== undefined &&
                    props.generalMode === 'contentQuiz'
                  ? columnsForContentQuiz
                  : props.generalMode === 'onlineStanding'
                  ? columnsForOnlineStanding
                  : columns
              }
              data={state.quizzes}
              setData={newData => {
                dispatch({quizzes: newData});
              }}
              handleOp={handleOp}
              token={props.token}
              setLoading={props.setLoading}
              removeUrl={
                props.generalMode === undefined || props.generalMode === 'irysc'
                  ? routes.removeIRYSCQuiz
                  : props.generalMode === 'openQuiz'
                  ? routes.removeOpenQuiz
                  : routes.removeQuiz + props.generalMode
              }
            />
          )}
        </MyView>
      </CommonWebBox>
    </MyView>
  );
};

export default List;
