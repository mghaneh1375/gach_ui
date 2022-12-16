import React from 'react';

const defaultGlobalState = {
  allItems: undefined,
  selectableItems: undefined,
  wantedPackages: undefined,
  selectedPrice: 'all',
  selectedPackage: undefined,
};
export const packagesContext = React.createContext(defaultGlobalState);
export const dispatchPackagesContext = React.createContext(undefined);

export const PackageProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

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

  return (
    <packagesContext.Provider value={state}>
      <dispatchPackagesContext.Provider value={dispatch}>
        {children}
      </dispatchPackagesContext.Provider>
    </packagesContext.Provider>
  );
};
