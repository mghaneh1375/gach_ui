import React from 'react';

const defaultGlobalState = {
  notifs: undefined,
  needUpdate: false,
  selectedNotif: undefined,
};
export const notifContext = React.createContext(defaultGlobalState);
export const dispatchNotifContext = React.createContext(undefined);

export const NotifProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.notifs === undefined || state.selectedNotif === undefined) return;
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateNotif = () => {
      dispatch({
        notifs: state.notifs.map(elem => {
          if (elem.id === state.selectedNotif.id) return state.selectedNotif;
          return elem;
        }),
      });
    };

    if (state.selectedNotif === undefined) return;

    updateNotif();
  }, [state.needUpdate, state.notifs, state.selectedNotif, dispatch]);

  return (
    <notifContext.Provider value={state}>
      <dispatchNotifContext.Provider value={dispatch}>
        {children}
      </dispatchNotifContext.Provider>
    </notifContext.Provider>
  );
};
