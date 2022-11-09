import React from 'react';

const defaultGlobalState = {
  contents: undefined,
  needUpdate: false,
  selectedContent: undefined,
};
export const contentContext = React.createContext(defaultGlobalState);
export const dispatchContentContext = React.createContext(undefined);

export const ContentProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.contents === undefined || state.selectedContent === undefined)
      return;
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateContent = () => {
      dispatch({
        contents: state.contents.map(elem => {
          if (elem.id === state.selectedContent.id)
            return state.selectedContent;
          return elem;
        }),
      });
    };

    if (state.selectedContent === undefined) return;

    updateContent();
  }, [state.needUpdate, state.contents, state.selectedContent, dispatch]);

  return (
    <contentContext.Provider value={state}>
      <dispatchContentContext.Provider value={dispatch}>
        {children}
      </dispatchContentContext.Provider>
    </contentContext.Provider>
  );
};
