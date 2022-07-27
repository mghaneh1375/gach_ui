import {View} from 'react-native';
import React, {useState} from 'react';
import {
  answerSheetContext,
  dispatchAnswerSheetContext,
} from './AnswerSheetProvider';
import Test from './Test';

function TestAnswerSheet(props) {
  const useGlobalState = () => [
    React.useContext(answerSheetContext),
    React.useContext(dispatchAnswerSheetContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <View>
      {state.answerSheet !== undefined &&
        state.answerSheet.map((elem, index) => {
          return <Test key={index} />;
        })}
    </View>
  );
}

export default TestAnswerSheet;
