import React from 'react';

const defaultGlobalState = {
  tags: undefined,
};
export const teachTagReportContext = React.createContext(defaultGlobalState);
export const dispatchTeachTagReportContext = React.createContext(undefined);

export const TeachTagReportProvider = ({children}) => {
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
    <teachTagReportContext.Provider value={state}>
      <dispatchTeachTagReportContext.Provider value={dispatch}>
        {children}
      </dispatchTeachTagReportContext.Provider>
    </teachTagReportContext.Provider>
  );
};
