import {routes} from '../../../../API/APIRoutes';
import {downloadRequest, generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';

export const getQuizzes = async token => {
  return await generalRequest(
    routes.fetchAllQuiz,
    'get',
    undefined,
    'data',
    token,
  );
};

export const removeQuiz = async (generalMode, quizId, token) => {
  let res = await generalRequest(
    generalMode === 'IRYSC'
      ? routes.removeIRYSCQuiz + quizId
      : routes.removeSchoolQuiz + quizId,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};

export const getTags = async () => {
  return await generalRequest(routes.fetchQuizTags, 'get', undefined, 'data');
};

export const getAnswerSheets = async (quizId, quizMode, token) => {
  return await generalRequest(
    routes.fetchQuizAnswerSheets + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const getAnswerSheet = async (quizId, quizMode, token) => {
  return await generalRequest(
    routes.fetchQuizAnswerSheet + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const getQuestions = async (token, quizId, quizMode) => {
  return await generalRequest(
    routes.fetchQuestions + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const updateQuestionMark = async (
  token,
  quizId,
  quizMode,
  questionId,
  newMark,
) => {
  return await generalRequest(
    routes.updateQuestionMark +
      quizMode +
      '/' +
      quizId +
      '/' +
      questionId +
      '/' +
      newMark,
    'put',
    undefined,
    undefined,
    token,
  );
};

export const generateQuestionPDF = async (quizId, quizMode, token) => {
  await downloadRequest(
    routes.generateQuestionPDF + quizMode + '/' + quizId,
    undefined,
    token,
  );
};

export const removeStudents = async (quizId, quizMode, ids, token) => {
  return await generalRequest(
    routes.forceDeportation + quizMode + '/' + quizId,
    'delete',
    {
      items: ids,
    },
    ['excepts', 'doneIds'],
    token,
  );
};

export const correct = async (quizId, userId, token) => {
  return await generalRequest(
    routes.correct + quizId + '/' + userId,
    'post',
    undefined,
    ['path', 'result'],
    token,
  );
};
