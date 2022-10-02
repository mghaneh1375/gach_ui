import React from 'react';

const defaultGlobalState = {
  users: undefined,
  needUpdate: false,
  selectedUser: undefined,
  fetched: [],
};
export const usersContext = React.createContext(defaultGlobalState);
export const dispatchUsersContext = React.createContext(undefined);

export const UsersProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.users === undefined || state.selectedUser === undefined) return;
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateUser = () => {
      dispatch({
        users: state.users.map(elem => {
          if (elem.id === state.selectedUser.id) return state.selectedUser;
          return elem;
        }),
      });
    };

    if (state.selectedUser === undefined) return;

    updateUser();
  }, [state.needUpdate, state.users, state.selectedUser, dispatch]);

  return (
    <usersContext.Provider value={state}>
      <dispatchUsersContext.Provider value={dispatch}>
        {children}
      </dispatchUsersContext.Provider>
    </usersContext.Provider>
  );
};
