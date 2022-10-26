import React from 'react';

const defaultGlobalState = {
  allSchools: undefined,
  schools: undefined,
  states: undefined,
  data: undefined,
  needUpdate: false,
  needFilter: false,
  selectedSchool: undefined,
  selectedSchoolForFilter: undefined,
};
export const schoolContext = React.createContext(defaultGlobalState);
export const dispatchSchoolContext = React.createContext(undefined);

export const SchoolProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (
      state.schools === undefined ||
      state.selectedSchoolForFilter === undefined
    )
      return;
    if (state.needFilter === undefined || !state.needFilter) return;

    dispatch({needFilter: false});
    const updateData = () => {
      dispatch({
        data: state.schools.filter(elem => {
          return elem.id === state.selectedSchoolForFilter.id;
        }),
      });
    };

    if (state.selectedSchoolForFilter === undefined) return;

    updateData();
  }, [
    state.needFilter,
    state.schools,
    state.selectedSchoolForFilter,
    dispatch,
  ]);

  return (
    <schoolContext.Provider value={state}>
      <dispatchSchoolContext.Provider value={dispatch}>
        {children}
      </dispatchSchoolContext.Provider>
    </schoolContext.Provider>
  );
};
