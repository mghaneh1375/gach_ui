import React from 'react';

const defaultGlobalState = {
  barcodes: undefined,
  needUpdate: false,
  selectedQuiz: undefined,
};
export const spinnerContext = React.createContext(defaultGlobalState);
export const dispatchSpinnerContext = React.createContext(undefined);

export const BarcodeProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  //   React.useEffect(() => {
  //     if (state.contents === undefined || state.selectedContent === undefined)
  //       return;
  //     if (state.needUpdate === undefined || !state.needUpdate) return;

  //     dispatch({needUpdate: false});
  //     const updateContent = () => {
  //       dispatch({
  //         contents: state.contents.map(elem => {
  //           if (elem.id === state.selectedContent.id)
  //             return state.selectedContent;
  //           return elem;
  //         }),
  //       });
  //     };

  //     if (state.selectedContent === undefined) return;

  //     updateContent();
  //   }, [state.needUpdate, state.contents, state.selectedContent, dispatch]);

  return (
    <spinnerContext.Provider value={state}>
      <dispatchSpinnerContext.Provider value={dispatch}>
        {children}
      </dispatchSpinnerContext.Provider>
    </spinnerContext.Provider>
  );
};
