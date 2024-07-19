import React from 'react';

const defaultGlobalState = {
  tags: undefined,
};
export const teachReportContext = React.createContext(defaultGlobalState);
export const dispatchTeachReportContext = React.createContext(undefined);

export const TeachReportProvider = ({children}) => {
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
    <teachReportContext.Provider value={state}>
      <dispatchTeachReportContext.Provider value={dispatch}>
        {children}
      </dispatchTeachReportContext.Provider>
    </teachReportContext.Provider>
  );
};
