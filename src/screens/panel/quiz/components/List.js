import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';
import translator from '../Translator';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import React, {useState} from 'react';
import Ops from './Ops';
import {routes} from '../../../../API/APIRoutes';
import {dispatchQuizContext, quizContext} from './Context';
import columns from './TableStructure';
import {getQuizzes} from './Utility';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (state.quizzes !== undefined) return;

    props.setLoading(true);
    Promise.all([getQuizzes(props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      dispatch({quizzes: res[0]});
    });
  }, [props, dispatch, state.quizzes]);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const handleOp = idx => {
    dispatch({selectedQuiz: state.quizzes[idx]});
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          updateQuiz={props.updateQuiz}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        header={translator.quizes}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <View>
          {state.quizzes !== undefined && (
            <CommonDataTable
              columns={columns}
              data={state.quizzes}
              setData={props.setQuizzes}
              handleOp={handleOp}
              token={props.token}
              setLoading={props.setLoading}
              removeUrl={routes.removeIRYSCQuiz}
            />
          )}
        </View>
      </CommonWebBox>
    </View>
  );
};

export default List;
