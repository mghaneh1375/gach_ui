import React from 'react';
import {CommonButton} from '../../../../../styles/Common';

const defaultGlobalState = {
  authors: undefined,
  allowShow: undefined,
  isLoadingOn: undefined,
  currPage: undefined,
  totalPage: [],
  showEasy: true,
  showMid: true,
  showHard: true,
  questions: undefined,
  questionsAfterFilter: undefined,
  easy: 0,
  mid: 0,
  hard: 0,
};

export const perPage = 10;

export const questionContext = React.createContext(defaultGlobalState);
export const dispatchQuestionContext = React.createContext(undefined);

export const QuestionProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.questionsAfterFilter === undefined) return;

    let easy = 0;
    let mid = 0;
    let hard = 0;

    state.questionsAfterFilter.forEach(element => {
      if (element.level === 'easy') easy++;
      else if (element.level === 'mid') mid++;
      else if (element.level === 'hard') hard++;
    });

    dispatch({
      currPage: 1,
      totalPageInt: state.questionsAfterFilter.length / perPage,
      easy: easy,
      mid: mid,
      hard: hard,
    });
  }, [state.questionsAfterFilter]);

  React.useEffect(() => {
    let pagination = [];
    for (let i = 0; i < state.totalPageInt; i++)
      pagination.push(
        <CommonButton
          onPress={() => dispatch({currPage: i + 1})}
          theme={i + 1 === state.currPage ? 'dark' : undefined}
          key={i}
          title={i + 1}
        />,
      );

    dispatch({totalPage: pagination});
  }, [state.totalPageInt, state.currPage, dispatch]);

  React.useEffect(() => {
    if (
      state.questionsAfterFilter === undefined ||
      state.currPage === undefined
    )
      return;

    dispatch({
      questions: state.questionsAfterFilter.slice(
        (state.currPage - 1) * perPage,
        state.currPage * perPage,
      ),
    });
  }, [state.questionsAfterFilter, state.currPage]);

  return (
    <questionContext.Provider value={state}>
      <dispatchQuestionContext.Provider value={dispatch}>
        {children}
      </dispatchQuestionContext.Provider>
    </questionContext.Provider>
  );
};
