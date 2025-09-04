import React from 'react';

const defaultGlobalState = {
  levels: undefined,
  needUpdate: false,
  selectedLevel: undefined,
};
export const levelContext = React.createContext(defaultGlobalState);
export const dispatchLevelContext = React.createContext(undefined);

export const LevelProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateLevel = () => {
      dispatch({
        levels: state.levels.map(elem => {
          if (elem.id === state.selectedLevel.id) return state.selectedLevel;
          return elem;
        }),
      });
    };

    if (state.levels === undefined || state.selectedLevel === undefined) return;

    updateLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.needUpdate]);

  return (
    <levelContext.Provider value={state}>
      <dispatchLevelContext.Provider value={dispatch}>
        {children}
      </dispatchLevelContext.Provider>
    </levelContext.Provider>
  );
};
