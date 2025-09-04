import React from 'react';

const defaultGlobalState = {
  badges: undefined,
  actions: undefined,
  needUpdate: false,
  selectedBadge: undefined,
};
export const badgeContext = React.createContext(defaultGlobalState);
export const dispatchBadgeContext = React.createContext(undefined);

export const BadgeProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.badges === undefined || state.selectedBadge === undefined) return;
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateBadge = () => {
      dispatch({
        badges: state.badges.map(elem => {
          if (elem.id === state.selectedBadge.id) return state.selectedBadge;
          return elem;
        }),
      });
    };

    if (state.selectedBadge === undefined) return;

    updateBadge();
  }, [state.needUpdate, state.badges, state.selectedBadge, dispatch]);

  return (
    <badgeContext.Provider value={state}>
      <dispatchBadgeContext.Provider value={dispatch}>
        {children}
      </dispatchBadgeContext.Provider>
    </badgeContext.Provider>
  );
};
