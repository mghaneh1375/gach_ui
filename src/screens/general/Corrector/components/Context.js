import React from 'react';

const defaultGlobalState = {
  questions: undefined,
  answers: undefined,
  mark: undefined,
  marks: undefined,
  quizInfo: undefined,
  currIdx: 0,
  needUpdate: false,
  needUpdateMark: false,
};

export const doCorrectContext = React.createContext(defaultGlobalState);
export const dispatchDoCorrectContext = React.createContext(undefined);

export const DoCorrectProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const setMark = React.useCallback(() => {
    if (
      state.currIdx === undefined ||
      state.currIdx < 0 ||
      state.mark === undefined
    ) {
      dispatch({needUpdateMark: false});
      return;
    }

    state.answers[state.currIdx].stdAns.mark = state.mark;

    dispatch({answers: state.answers, needUpdateMark: false});
  }, [state.currIdx, state.answers, state.mark]);

  React.useEffect(() => {
    if (!state.needUpdateMark) return;
    setMark();
  }, [state.needUpdateMark, setMark]);

  return (
    <doCorrectContext.Provider value={state}>
      <dispatchDoCorrectContext.Provider value={dispatch}>
        {children}
      </dispatchDoCorrectContext.Provider>
    </doCorrectContext.Provider>
  );
};
