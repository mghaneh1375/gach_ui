import React from 'react';

const defaultGlobalState = {
  questions: undefined,
  bookmarks: [],
  quizInfo: undefined,
  currIdx: 0,
  needUpdate: false,
};

export const doQuizContext = React.createContext(defaultGlobalState);
export const dispatchDoQuizContext = React.createContext(undefined);

export const DoQuizProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const updateQuestion = React.useCallback(() => {
    console.log('asd');
    if (state.question === undefined || state.questions === undefined) {
      dispatch({questions: newQuestions, needUpdate: false});
      return;
    }
    let newQuestions = state.questions.map(elem => {
      if (elem.id !== state.question.id) return elem;
      return state.question;
    });

    dispatch({questions: newQuestions, needUpdate: false});
  }, [state.question, state.questions]);

  React.useEffect(() => {
    if (!state.needUpdate) return;
    updateQuestion();
  }, [state.needUpdate, updateQuestion]);

  return (
    <doQuizContext.Provider value={state}>
      <dispatchDoQuizContext.Provider value={dispatch}>
        {children}
      </dispatchDoQuizContext.Provider>
    </doQuizContext.Provider>
  );
};
