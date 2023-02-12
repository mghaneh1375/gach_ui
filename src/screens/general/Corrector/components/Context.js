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

    state.marks[state.currIdx] = state.mark;

    dispatch({marks: state.marks, needUpdateMark: false});
  }, [state.currIdx, state.mark, state.marks]);

  React.useEffect(() => {
    if (!state.needUpdateMark) return;
    setMark();
  }, [state.needUpdateMark, setMark]);

  // const saveMarks = React.useCallback(() => {
  //   // Promise.all([
  //   //   doSaveAnswers(
  //   //     {
  //   //       answers: state.answers,
  //   //     },
  //   //     state.quizInfo.id,
  //   //     state.quizInfo.generalMode,
  //   //     state.token,
  //   //   ),
  //   // ]).then(res => {
  //   //   state.setLoadingWithText(false);
  //   //   if (res[0] === null) {
  //   //     state.navigate = '/';
  //   //     return;
  //   //   }
  //   // });
  // }, [state]);

  return (
    <doCorrectContext.Provider value={state}>
      <dispatchDoCorrectContext.Provider value={dispatch}>
        {children}
      </dispatchDoCorrectContext.Provider>
    </doCorrectContext.Provider>
  );
};
