import React from 'react';

const defaultGlobalState = {
  barcodes: undefined,
  needUpdate: false,
  selectedQuiz: undefined,
};
export const barcodeContext = React.createContext(defaultGlobalState);
export const dispatchBarcodeContext = React.createContext(undefined);

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
    <barcodeContext.Provider value={state}>
      <dispatchBarcodeContext.Provider value={dispatch}>
        {children}
      </dispatchBarcodeContext.Provider>
    </barcodeContext.Provider>
  );
};
