import React, {useReducer} from 'react';

const defaultGlobalState = {
  needUpdate: false,
  selectedQuiz: undefined,
};
export const courseContext = React.createContext(defaultGlobalState);
export const dispatchCourseContext = React.createContext(undefined);

export const CourseProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <courseContext.Provider value={state}>
      <dispatchCourseContext.Provider value={dispatch}>
        {children}
      </dispatchCourseContext.Provider>
    </courseContext.Provider>
  );
};
