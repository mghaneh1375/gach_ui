import React from 'react';
import {dispatchStateContext} from '../../../../../App';

const defaultGlobalState = {
  selectingQuiz: false,
  quizzes: undefined,
  registrableQuizzes: undefined,
  filters: undefined,
};
export const quizzesContext = React.createContext(defaultGlobalState);
export const dispatchQuizzesContext = React.createContext(undefined);

export const QuizzesProvider = ({children}) => {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [globalDispatch] = useGlobalState();

  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const setFilters = React.useCallback(() => {
    if (state.filters === undefined) return;
    globalDispatch({
      isRightMenuVisible: false,
      isFilterMenuVisible: true,
      filters: state.filters,
    });
  }, [globalDispatch, state.filters]);

  React.useEffect(() => {
    if (state.selectingQuiz === undefined || !state.selectingQuiz) return;
    setFilters();
  }, [state.selectingQuiz, state.filters, setFilters]);

  return (
    <quizzesContext.Provider value={state}>
      <dispatchQuizzesContext.Provider value={dispatch}>
        {children}
      </dispatchQuizzesContext.Provider>
    </quizzesContext.Provider>
  );
};
