import React from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
const defaultGlobalState = {
  allItems: undefined,
  selectableItems: undefined,
  filters: undefined,
  checkedFilterIndices: undefined,
  needUpdateFilters: false,
  selectedStudents: undefined,
  wantedQuizzes: undefined,
  selectedKindQuiz: 'all',
  selectedPrice: 'all',
};
export const packagesContext = React.createContext(defaultGlobalState);
export const dispatchPackagesContext = React.createContext(undefined);

export const PackageProvider = ({children}) => {
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
      selectableItems: state.allItems,
      checkedFilterIndices: [],
    });
  }, [state.allItems, state.filters]);

  const doFilter = React.useCallback(() => {
    if (
      state.checkedFilterIndices === undefined ||
      state.filters === undefined ||
      state.selectableItems === undefined ||
      state.allItems === undefined
    )
      return;

    let allFilters =
      state.filters.items instanceof Array ? state.filters.items : [];
    if (state.filters.items instanceof Object) {
      for (const [key, value] of Object.entries(state.filters.items)) {
        value.forEach(str => {
          allFilters.push(str);
        });
      }
    }

    let newItems = [];

    state.allItems.forEach(elem => {
      if (state.checkedFilterIndices.length > 0) {
        let hasWantedTag = false;

        for (let i = 0; i < state.checkedFilterIndices.length; i++) {
          if (
            elem.tags !== undefined &&
            elem.tags.indexOf(state.checkedFilterIndices[i]) !== -1
          ) {
            hasWantedTag = true;
            break;
          }
        }

        if (!hasWantedTag) return;
      }

      if (
        (state.selectedKindQuiz === 'open' &&
          elem.type !== undefined &&
          elem.type === 'package') ||
        (state.selectedKindQuiz === 'regular' &&
          elem.generalMode !== undefined &&
          elem.generalMode === 'open')
      )
        return;

      if (
        (state.selectedPrice === 'free' &&
          ((elem.realPrice !== undefined && elem.realPrice > 0) ||
            (elem.price !== undefined && elem.price > 0))) ||
        (state.selectedPrice === 'nonFree' &&
          ((elem.realPrice !== undefined && elem.realPrice === 0) ||
            (elem.price !== undefined && elem.price === 0)))
      )
        return;

      newItems.push(elem);
    });
    dispatch({
      selectableItems: newItems,
      needUpdateFilters: false,
    });
  }, [
    state.filters,
    state.selectedKindQuiz,
    state.selectedPrice,
    state.checkedFilterIndices,
    state.allItems,
    state.selectableItems,
  ]);

  const setFilters = React.useCallback(() => {
    if (state.filters === undefined) return;

    globalDispatch({
      isRightMenuVisible: false,
      isFilterMenuVisible: globalState.isInPhone ? false : true,
      filters: state.filters.items,
      allItems: state.allItems === undefined ? 0 : state.allItems.length,
      selectableItems:
        state.selectableItems === undefined ? 0 : state.selectableItems.length,
      onChangeFilter: state.filters.onChangeFilter,
      onChangeKindQuiz: state.filters.onChangeKindQuiz,
      onChangePrice: state.filters.onChangePrice,
      allFilter: true,
    });
  }, [
    globalDispatch,
    state.filters,
    state.selectableItems,
    state.allItems,
    globalState.isInPhone,
  ]);

  React.useEffect(() => {
    setFilters();
  }, [state.filters, setFilters]);

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
    <packagesContext.Provider value={state}>
      <dispatchPackagesContext.Provider value={dispatch}>
        {children}
      </dispatchPackagesContext.Provider>
    </packagesContext.Provider>
  );
};
