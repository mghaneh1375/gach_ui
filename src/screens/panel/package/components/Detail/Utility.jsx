import React from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../../App';

const defaultGlobalState = {
  selectingQuiz: false,
  quizzes: undefined,
  allItems: undefined,
  selectableQuizzes: undefined,
  filters: undefined,
  checkedFilterIndices: undefined,
  needUpdateFilters: false,
};
export const quizzesContext = React.createContext(defaultGlobalState);
export const dispatchQuizzesContext = React.createContext(undefined);

export const QuizzesProvider = ({children}) => {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [globalState, globalDispatch] = useGlobalState();

  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const selectAll = React.useCallback(() => {
    if (state.filters === undefined) return;

    dispatch({
      selectableQuizzes: state.allItems,
      checkedFilterIndices: [],
    });
  }, [state.allItems, state.filters]);

  const doFilter = React.useCallback(() => {
    if (
      state.checkedFilterIndices === undefined ||
      state.filters === undefined ||
      state.selectableQuizzes === undefined ||
      state.allItems === undefined
    )
      return;

    const newItems = [];
    state.allItems.forEach(elem => {
      let hasWantedTag = false;

      for (let i = 0; i < state.checkedFilterIndices.length; i++) {
        if (elem.tags.indexOf(state.checkedFilterIndices[i]) !== -1) {
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
    state.allItems,
    state.selectableQuizzes,
  ]);

  const setFilters = React.useCallback(() => {
    if (state.filters === undefined) return;

    globalDispatch({
      isRightMenuVisible: false,
      isFilterMenuVisible: true,
      filters: state.filters.items,
      onChangeFilter: state.filters.onChangeFilter,
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

  React.useEffect(() => {
    if (globalState.allFilter === undefined || !globalState.allFilter) return;
    selectAll();
  }, [globalState.allFilter, selectAll]);

  return (
    <quizzesContext.Provider value={state}>
      <dispatchQuizzesContext.Provider value={dispatch}>
        {children}
      </dispatchQuizzesContext.Provider>
    </quizzesContext.Provider>
  );
};
