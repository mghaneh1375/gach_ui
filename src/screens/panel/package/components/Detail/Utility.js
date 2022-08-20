import React from 'react';
import {dispatchStateContext} from '../../../../../App';

const defaultGlobalState = {
  selectingQuiz: false,
  quizzes: undefined,
  registrableQuizzes: undefined,
  selectableQuizzes: undefined,
  filters: undefined,
  checkedFilterIndices: [],
  needUpdateFilters: false,
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

  const doFilter = React.useCallback(() => {
    if (
      state.checkedFilterIndices === undefined ||
      state.filters === undefined ||
      state.selectableQuizzes === undefined ||
      state.registrableQuizzes === undefined
    )
      return;

    let currFilters = [];
    state.filters.forEach((elem, idx) => {
      if (state.checkedFilterIndices.indexOf(idx) !== -1)
        currFilters.push(elem.label);
    });
    let newItems = [];
    state.registrableQuizzes.forEach(elem => {
      let hasWantedTag = false;
      for (let i = 0; i < currFilters.length; i++) {
        if (elem.tags.indexOf(currFilters[i]) !== -1) {
          hasWantedTag = true;
          break;
        }
      }
      if (hasWantedTag) newItems.push(elem);
    });

    dispatch({
      selectableQuizzes: newItems,
      needUpdateFilters: false,
    });
  }, [
    state.filters,
    state.checkedFilterIndices,
    state.registrableQuizzes,
    state.selectableQuizzes,
  ]);

  const setFilters = React.useCallback(() => {
    if (state.filters === undefined) return;

    globalDispatch({
      isRightMenuVisible: false,
      isFilterMenuVisible: true,
      filters: state.filters,
    });
  }, [globalDispatch, state.filters]);

  const unSetFilters = React.useCallback(() => {
    globalDispatch({
      isRightMenuVisible: true,
      isFilterMenuVisible: false,
      filters: undefined,
      needUpdateFilters: false,
    });
  }, [globalDispatch]);

  React.useEffect(() => {
    if (state.selectingQuiz === undefined || !state.selectingQuiz) {
      unSetFilters();
      return;
    }
    setFilters();
  }, [state.selectingQuiz, state.filters, setFilters, unSetFilters]);

  React.useEffect(() => {
    if (state.needUpdateFilters === undefined || !state.needUpdateFilters)
      return;
    doFilter();
  }, [state.checkedFilterIndices, state.needUpdateFilters, doFilter]);

  return (
    <quizzesContext.Provider value={state}>
      <dispatchQuizzesContext.Provider value={dispatch}>
        {children}
      </dispatchQuizzesContext.Provider>
    </quizzesContext.Provider>
  );
};
