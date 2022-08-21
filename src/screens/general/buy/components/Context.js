import React from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
const defaultGlobalState = {
  allItems: undefined,
  selectableItems: undefined,
  filters: undefined,
  checkedFilterIndices: undefined,
  needUpdateFilters: false,
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
      selectableItems: newItems,
      needUpdateFilters: false,
    });
  }, [
    state.filters,
    state.checkedFilterIndices,
    state.allItems,
    state.selectableItems,
  ]);

  const setFilters = React.useCallback(() => {
    if (state.filters === undefined) return;

    globalDispatch({
      isRightMenuVisible: false,
      isFilterMenuVisible: true,
      filters: state.filters.items,
      onChangeFilter: state.filters.onChangeFilter,
      allFilter: true,
    });
  }, [globalDispatch, state.filters]);

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
