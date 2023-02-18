import {routes} from '../../../../API/APIRoutes';
import {
  CV_BASE_URL,
  fileRequest,
  generalRequest,
} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

export const reviewQuiz = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.reviewQuiz + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const doQuiz = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.doQuiz + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const doUploadAnswer = async (
  generalQuizMode,
  quizId,
  questionId,
  filesContent,
  token,
) => {
  let data = new FormData();
  var myblob = new Blob([new Uint8Array(filesContent[0].content)]);
  data.append('file', myblob, filesContent[0].name);

  let res = await fileRequest(
    routes.uploadStudentAnswers +
      generalQuizMode +
      '/' +
      quizId +
      '/' +
      questionId,
    'put',
    data,
    'data',
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const doUploadAnswerSheet = async (
  generalQuizMode,
  quizId,
  filesContent,
  token,
) => {
  let data = new FormData();
  var myblob = new Blob([new Uint8Array(filesContent[0].content)]);
  data.append('file', myblob, filesContent[0].name);

  let res = await fileRequest(
    CV_BASE_URL + 'uploadAnswersSheet/' + generalQuizMode + '/' + quizId,
    'put',
    data,
    'data',
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const doSaveAnswers = async (answers, quizId, generalMode, token) => {
  return await generalRequest(
    routes.storeStudentAnswers + generalMode + '/' + quizId,
    'put',
    answers,
    ['refresh', 'reminder'],
    token,
  );
};
