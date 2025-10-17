import React from 'react';

const defaultGlobalState = {
  tags: undefined,
};
export const adviceTagReportContext = React.createContext(defaultGlobalState);
export const dispatchAdviceTagReportContext = React.createContext(undefined);

export const AdviceTagReportProvider = ({children}) => {
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
    <adviceTagReportContext.Provider value={state}>
      <dispatchAdviceTagReportContext.Provider value={dispatch}>
        {children}
      </dispatchAdviceTagReportContext.Provider>
    </adviceTagReportContext.Provider>
  );
};
