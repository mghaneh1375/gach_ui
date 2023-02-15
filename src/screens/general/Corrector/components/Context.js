import React from 'react';

const defaultGlobalState = {
  answers: undefined,
  mark: undefined,
  descMark: undefined,
  quizInfo: undefined,
  currIdx: 0,
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

    if (state.descMark !== undefined)
      state.answers[state.currIdx].stdAns.descMark = state.descMark;

    dispatch({answers: state.answers, needUpdateMark: false});
  }, [state.currIdx, state.answers, state.mark, state.descMark]);

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
