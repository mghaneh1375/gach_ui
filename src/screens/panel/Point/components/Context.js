import React from 'react';

const defaultGlobalState = {
  points: undefined,
  actions: undefined,
  needUpdate: false,
  selectedPoint: undefined,
};
export const pointContext = React.createContext(defaultGlobalState);
export const dispatchPointContext = React.createContext(undefined);

export const PointProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updatePoint = () => {
      dispatch({
        points: state.points.map(elem => {
          if (elem.id === state.selectedPoint.id) return state.selectedPoint;
          return elem;
        }),
      });
    };

    if (state.points === undefined || state.selectedPoint === undefined) return;

    updatePoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.needUpdate]);

  return (
    <pointContext.Provider value={state}>
      <dispatchPointContext.Provider value={dispatch}>
        {children}
      </dispatchPointContext.Provider>
    </pointContext.Provider>
  );
};
