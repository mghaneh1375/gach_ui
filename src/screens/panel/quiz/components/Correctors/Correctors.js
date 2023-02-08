import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {CommonButton, CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import {dispatchQuizContext, quizContext} from '../Context';
import {addCorrector, fetchCorrector, fetchCorrectors} from '../Utility';
import columns from './TableStructure';
import commonTranslator from '../../../../../translator/Common';
import Ops from './Ops';
import StudentCard from './StudentCard';

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
      state.selectedCorrector.students !== undefined ||
      state.selectedCorrector.questions !== undefined ||
      isWorking
    )
      return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      fetchCorrector(
        state.selectedQuiz.id,
        state.selectedQuiz.quizGeneralMode,
        state.selectedCorrector.id,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        setTaskMode(undefined);
        return;
      }

      state.selectedCorrector.tasks = res[0];
      dispatch({selectedCorrector: state.selectedCorrector.tasks});
    });
  }, [state.selectedCorrector, isWorking, dispatch, props, state.selectedQuiz]);

  React.useEffect(() => {
    if (taskMode == undefined) return;

    getCorrector();
  }, [taskMode, getCorrector]);

  return (
    <>
      {taskMode !== undefined &&
        taskMode == 'list' &&
        state.selectedCorrector.tasks !== undefined && (
          <CommonWebBox
            header={state.selectedCorrector.name}
            backBtn={true}
            onBackClick={() => setTaskMode(undefined)}>
            {state.selectedCorrector.tasks.map((elem, index) => {
              return <StudentCard key={index} elem={elem} />;
            })}
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
