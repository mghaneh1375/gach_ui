import React from 'react';
import {View} from 'react-native';
import TestAnswerSheet from './TestAnswerSheet';
import {
  answerSheetContext,
  dispatchAnswerSheetContext,
} from './AnswerSheetProvider';

function AnswerSheet(props) {
  const useGlobalState = () => [
    React.useContext(answerSheetContext),
    React.useContext(dispatchAnswerSheetContext),
  ];
  const [state, dispatch] = useGlobalState();
  console.log(state);
  return (
    <View>
      {state.quizMode !== undefined && state.quizMode === 'regular' && (
        <TestAnswerSheet />
      )}
    </View>
  );
}

export default AnswerSheet;
