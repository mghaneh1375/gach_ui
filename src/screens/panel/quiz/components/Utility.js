import {routes} from '../../../../API/APIRoutes';
import {downloadRequest, generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';

export const getQuizzes = async token => {
  return await generalRequest(
    routes.fetchAllQuiz,
    'get',
    undefined,
    'data',
    token,
  );
};

export const getQuiz = async (quizId, quizMode, token) => {
  return await generalRequest(
    routes.fetchQuiz + quizMode + '/' + quizId,
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

export const fetchSchoolReport = async (quizId, token) => {
  return await generalRequest(
    routes.fetchSchoolReport + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const resetStudentQuizEntryTime = async (
  quizId,
  quizMode,
  studentId,
  token,
) => {
  let res = await generalRequest(
    routes.resetStudentQuizEntryTime +
      quizMode +
      '/' +
      quizId +
      '/' +
      studentId,
    'put',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const fetchParticipantReport = async (quizId, token) => {
  return await generalRequest(
    routes.fetchParticipantReport + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchAuthorReport = async (quizId, token) => {
  return await generalRequest(
    routes.fetchAuthorReport + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchCityReport = async (quizId, token) => {
  return await generalRequest(
    routes.fetchCityReport + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchStateReport = async (quizId, token) => {
  return await generalRequest(
    routes.fetchStateReport + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchGenderReport = async (quizId, token) => {
  return await generalRequest(
    routes.fetchGenderReport + quizId,
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

export const getRanking = async (quizId, quizMode) => {
  return await generalRequest(
    routes.fetchQuizRanking + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
  );
};

export const getKarname = async (token, studentId, quizId, quizMode) => {
  return await generalRequest(
    routes.fetchQuizKarname + quizMode + '/' + quizId + '/' + studentId,
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

export const createTaraz = async (quizId, generalMode, token) => {
  let res = await generalRequest(
    routes.createTaraz + generalMode + '/' + quizId,
    'put',
    undefined,
    undefined,
    token,
  );

  if (res !== null) showSuccess();
};

export const updateStudentAnswers = async (
  quizId,
  studentId,
  quizGeneralMode,
  data,
  token,
) => {
  let res = await generalRequest(
    routes.storeAnswers + quizGeneralMode + '/' + quizId + '/' + studentId,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) {
    showSuccess();
    return 'ok';
  }
  return null;
};

export const fetchStudentAnswerSheet = async (
  quizId,
  quizMode,
  userId,
  token,
) => {
  return await generalRequest(
    routes.fetchStudentAnswerSheet + quizMode + '/' + quizId + '/' + userId,
    'get',
    undefined,
    'data',
    token,
  );
};
