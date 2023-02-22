import React, {useState} from 'react';
import {useFilePicker} from 'use-file-picker';
import {doSaveAnswers, doUploadAnswer, doUploadAnswerSheet} from './Utility';

const defaultGlobalState = {
  questions: undefined,
  answers: undefined,
  bookmarks: [],
  quizInfo: undefined,
  currIdx: 0,
  needUpdate: false,
  needUpdateBookmarks: false,
  needUpdateAnswer: false,
  reminder: undefined,
  refresh: undefined,
  clearTimer: false,
  exit: false,
  openFileSelectorFlag: undefined,
  stdAnswerSheets: undefined,
};

export const doQuizContext = React.createContext(defaultGlobalState);
export const dispatchDoQuizContext = React.createContext(undefined);

export const DoQuizProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const [openFileSelector, {filesContent, loading, errors, clear}] =
    useFilePicker({
      maxFileSize: 2,
      accept: ['image/*', '.pdf'],
      readAs: 'ArrayBuffer',
    });

  const [isUploading, setIsUploading] = useState(false);

  const uploadAns = React.useCallback(() => {
    if (state.quizInfo === undefined || isUploading) return;

    if (state.quizInfo.isQRNeeded !== undefined && state.quizInfo.isQRNeeded) {
      setIsUploading(true);
      state.setLoadingWithText(true);

      Promise.all([
        doUploadAnswerSheet(
          state.quizInfo.generalMode,
          state.quizInfo.id,
          filesContent,
          state.token,
        ),
      ]).then(res => {
        state.setLoadingWithText(false);

        if (res[0] != null) {
          let tmp = [];
          tmp.push(res[0]);
          if (state.stdAnswerSheets !== undefined) {
            state.stdAnswerSheets.forEach(e => {
              tmp.push(e);
            });
          }

          dispatch({stdAnswerSheets: tmp});
        }

        clear();
      });

      return;
    }

    if (
      state.questions[state.currIdx].canUpload === undefined ||
      !state.questions[state.currIdx].canUpload ||
      isUploading
    )
      return;

    setIsUploading(true);
    state.setLoadingWithText(true);

    Promise.all([
      doUploadAnswer(
        state.quizInfo.generalMode,
        state.quizInfo.id,
        state.questions[state.currIdx].id,
        filesContent,
        state.token,
      ),
    ]).then(res => {
      state.setLoadingWithText(false);
      if (res[0] != null) {
        state.answers[state.currIdx] = res[0].url;
        dispatch({answers: state.answers, reminder: res[0].reminder});
      }
      clear();
    });
  }, [filesContent, state, isUploading, clear]);

  React.useEffect(() => {
    if (filesContent === undefined || filesContent.length === 0)
      setIsUploading(false);
  }, [filesContent]);

  React.useEffect(() => {
    if (filesContent === undefined || filesContent.length !== 1) return;
    uploadAns();
  }, [filesContent, uploadAns]);

  const setBookmark = React.useCallback(() => {
    if (
      state.currIdx === undefined ||
      state.currIdx < 0 ||
      state.bookmarkStatus === undefined
    ) {
      dispatch({needUpdateBookmarks: false});
      return;
    }

    state.bookmarks[state.currIdx] = state.bookmarkStatus;

    dispatch({bookmarks: state.bookmarks, needUpdateBookmarks: false});
  }, [state.currIdx, state.bookmarkStatus, state.bookmarks]);

  const setAnswer = React.useCallback(() => {
    if (
      state.currIdx === undefined ||
      state.currIdx < 0 ||
      state.answer === undefined
    ) {
      dispatch({needUpdateAnswer: false});
      return;
    }

    state.answers[state.currIdx] = state.answer;

    dispatch({answers: state.answers, needUpdateAnswer: false});
  }, [state.currIdx, state.answer, state.answers]);

  const updateQuestion = React.useCallback(() => {
    if (state.question === undefined || state.questions === undefined) {
      dispatch({needUpdate: false});
      return;
    }
    let newQuestions = state.questions.map(elem => {
      if (elem.id !== state.question.id) return elem;
      return state.question;
    });

    dispatch({questions: newQuestions, needUpdate: false});
  }, [state.question, state.questions]);

  React.useEffect(() => {
    if (state.openFileSelectorFlag === undefined || !state.openFileSelectorFlag)
      return;
    openFileSelector();
    dispatch({openFileSelectorFlag: false});
  }, [state.openFileSelectorFlag, openFileSelector]);

  React.useEffect(() => {
    if (!state.needUpdate) return;
    updateQuestion();
  }, [state.needUpdate, updateQuestion]);

  React.useEffect(() => {
    if (!state.needUpdateAnswer) return;
    setAnswer();
  }, [state.needUpdateAnswer, setAnswer]);

  React.useEffect(() => {
    if (!state.needUpdateBookmarks) return;
    setBookmark();
  }, [state.needUpdateBookmarks, setBookmark]);

  React.useEffect(() => {
    if (!state.needStore) return;
    saveAnswers();
  }, [state.needStore, saveAnswers]);

  React.useEffect(() => {
    if (!state.exit) return;
    saveAnswersWithExit();
  }, [state.exit, saveAnswersWithExit]);

  const saveAnswers = React.useCallback(() => {
    state.setLoadingWithText(true);

    Promise.all([
      doSaveAnswers(
        {
          answers:
            state.quizInfo.mode === 'tashrihi'
              ? state.answers
                  .map((elem, index) => {
                    if (elem === undefined || elem.length === 0)
                      return undefined;

                    if (
                      state.questions[index].canUpload === undefined ||
                      !state.questions[index].canUpload
                    )
                      return {
                        questionId: state.questions[index].id,
                        answer: elem,
                      };

                    return undefined;
                  })
                  .filter(elem => {
                    return elem !== undefined;
                  })
              : state.answers,
        },
        state.quizInfo.id,
        state.quizInfo.generalMode,
        state.token,
      ),
    ]).then(res => {
      state.setLoadingWithText(false);
      if (res[0] === null) {
        state.navigate = '/';
        return;
      }

      dispatch({
        reminder: res[0].reminder,
        refresh: res[0].refresh,
        needStore: false,
        clearTimer: true,
      });
    });
  }, [state]);

  const saveAnswersWithExit = React.useCallback(() => {
    state.setLoadingWithText(true);

    Promise.all([
      doSaveAnswers(
        {
          answers:
            state.quizInfo.mode === 'tashrihi'
              ? state.answers
                  .map((elem, index) => {
                    if (elem === undefined || elem.length === 0)
                      return undefined;

                    if (
                      state.questions[index].canUpload === undefined ||
                      !state.questions[index].canUpload
                    )
                      return {
                        questionId: state.questions[index].id,
                        answer: elem,
                      };

                    return undefined;
                  })
                  .filter(elem => {
                    return elem !== undefined;
                  })
              : state.answers,
        },
        state.quizInfo.id,
        state.quizInfo.generalMode,
        state.token,
      ),
    ]).then(res => {
      state.setLoadingWithText(false);

      if (res[0] !== null)
        window.location.href =
          state.quizInfo.generalMode === 'custom'
            ? '/myCustomQuizzes'
            : '/myIRYSCQuizzes';
    });
  }, [state]);

  React.useEffect(() => {
    if (state.clearTimer) dispatch({clearTimer: false});
  }, [state.clearTimer]);

  return (
    <doQuizContext.Provider value={state}>
      <dispatchDoQuizContext.Provider value={dispatch}>
        {children}
      </dispatchDoQuizContext.Provider>
    </doQuizContext.Provider>
  );
};
