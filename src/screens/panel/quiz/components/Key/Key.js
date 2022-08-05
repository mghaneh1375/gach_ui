import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import AnswerSheet from '../AnswerSheet/AnswerSheet';
import {dispatchQuizContext, quizContext} from '../Context';
import {getAnswerSheet} from '../Utility';

function Key(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking) return;

    if (state.selectedQuiz.answer_sheet !== undefined) {
      dispatch({
        wanted_answer_sheet: state.selectedQuiz.answer_sheet,
      });
      return;
    }

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getAnswerSheet(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] !== null) {
        state.selectedQuiz.answer_sheet = res[0];
        dispatch({
          selectedQuiz: state.selectedQuiz,
          wanted_answer_sheet: res[0],
          needUpdate: true,
        });
      } else props.setMode('list');

      setIsWorking(false);
    });
  }, [props, isWorking, state.selectedQuiz, dispatch]);

  return (
    <View>
      <FontIcon
        onPress={() => props.setMode('list')}
        theme="rect"
        kind="normal"
        icon={faArrowLeft}
        parentStyle={{alignSelf: 'flex-end', marginLeft: 20, marginTop: 20}}
      />
      {state.wanted_answer_sheet !== undefined && (
        <AnswerSheet setLoading={props.setLoading} token={props.token} />
      )}
    </View>
  );
}

export default Key;
