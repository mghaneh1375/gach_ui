import React from 'react';

const defaultGlobalState = {
  tags: undefined,
};
export const questionReportContext = React.createContext(defaultGlobalState);
export const dispatchQuestionReportContext = React.createContext(undefined);

export const QuestionReportProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.tags === undefined || state.selectedTag === undefined) return;
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateTag = () => {
      dispatch({
        tags: state.tags.map(elem => {
          if (elem.id === state.selectedTag.id) return state.selectedTag;
          return elem;
        }),
      });
    };

    if (state.selectedTag === undefined) return;

    updateTag();
  }, [state.needUpdate, state.tags, state.selectedTag, dispatch]);

  return (
    <questionReportContext.Provider value={state}>
      <dispatchQuestionReportContext.Provider value={dispatch}>
        {children}
      </dispatchQuestionReportContext.Provider>
    </questionReportContext.Provider>
  );
};
