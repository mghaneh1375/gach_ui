import {routes} from '../../../../API/APIRoutes';
import {
  downloadRequest,
  fileRequest,
  generalRequest,
} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';

export const getQuizzes = async (
  token,
  name = undefined,
  startDateSolar = undefined,
  startDateSolarEndLimit = undefined,
  startRegistryDateSolar = undefined,
  startRegistrySolarEndLimit = undefined,
  kindQuiz = undefined,
) => {
  let query = new URLSearchParams();
  if (name !== undefined && name !== '') query.append('name', name);
  if (kindQuiz !== undefined && kindQuiz !== 'all')
    query.append('kind', kindQuiz);

  if (startDateSolar !== undefined && startDateSolar !== '')
    query.append('startDateSolar', startDateSolar);
  if (startDateSolarEndLimit !== undefined && startDateSolarEndLimit !== '')
    query.append('startDateSolarEndLimit', startDateSolarEndLimit);
  if (startRegistryDateSolar !== undefined && startRegistryDateSolar !== '')
    query.append('startRegistryDateSolar', startRegistryDateSolar);
  if (
    startRegistrySolarEndLimit !== undefined &&
    startRegistrySolarEndLimit !== ''
  )
    query.append('startRegistrySolarEndLimit', startRegistrySolarEndLimit);

  return await generalRequest(
    routes.fetchAllQuiz + 'IRYSC?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};

export const getOpenQuizzes = async (token, name = undefined) => {
  let query = new URLSearchParams();
  if (name !== undefined && name !== '') query.append('name', name);

  return await generalRequest(
    routes.fetchAllQuiz + 'OPEN?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};

export const getContentQuizzes = async (token, name = undefined) => {
  let query = new URLSearchParams();
  if (name !== undefined && name !== '') query.append('name', name);

  return await generalRequest(
    routes.fetchAllQuiz + 'content?' + query.toString(),
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
    generalMode === 'irysc'
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

export const getAnswerSheets = async (
  quizId,
  quizMode,
  token,
  studentId = undefined,
) => {
  return await generalRequest(
    studentId === undefined
      ? routes.fetchQuizAnswerSheets + quizMode + '/' + quizId
      : routes.fetchQuizAnswerSheets +
          quizMode +
          '/' +
          quizId +
          '?studentId=' +
          studentId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchSchoolReport = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.fetchSchoolReport + generalMode + '/' + quizId,
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

export const fetchParticipantReport = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.fetchParticipantReport + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchA1Report = async (quizId, mode, token) => {
  return await generalRequest(
    routes.fetchA1Report + mode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchAuthorReport = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.fetchAuthorReport + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchCityReport = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.fetchCityReport + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchKarnameReport = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.fetchKarnameReport + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchStateReport = async (quizId, quizMode, token) => {
  return await generalRequest(
    routes.fetchStateReport + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchGenderReport = async (quizId, quizMode, token) => {
  return await generalRequest(
    routes.fetchGenderReport + quizMode + '/' + quizId,
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

export const getRanking = async (quizId, quizMode, token = undefined) => {
  return await generalRequest(
    routes.fetchQuizRanking + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
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
  newCanUpload,
) => {
  if (newCanUpload === undefined)
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
  return await generalRequest(
    routes.updateQuestionMark +
      quizMode +
      '/' +
      quizId +
      '/' +
      questionId +
      '/' +
      newMark +
      '?canUpload=' +
      newCanUpload,
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

export const transferToOpenQuiz = async (quizId, token) => {
  let res = await generalRequest(
    routes.transferToOpenQuiz + quizId,
    'post',
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

export const addCorrector = async (NID, quizId, quizMode, token) => {
  let res = await generalRequest(
    routes.addCorrector + quizMode + '/' + quizId + '/' + NID,
    'post',
    undefined,
    'data',
    token,
  );
  if (res != null) showSuccess();
  return res;
};

export const fetchCorrectors = async (quizId, quizMode, token) => {
  return await generalRequest(
    routes.fetchQuizCorrectors + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchCorrector = async (quizId, quizMode, userId, token) => {
  return await generalRequest(
    routes.fetchQuizCorrector + quizMode + '/' + quizId + '/' + userId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const changeQuestionsArrangeInQuiz = async (
  quizId,
  generalMode,
  data,
  token,
) => {
  let res = await generalRequest(
    routes.changeArrangeQuestions + generalMode + '/' + quizId,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const finalizeQuizResult = async (quizId, token) => {
  let res = await generalRequest(
    routes.finalizeQuizResult + quizId,
    'post',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const addFile = async (token, fileContent, quizId, quizMode) => {
  return await fetch(fileContent.content)
    .then(res => res.blob())
    .then(async blob => {
      let formData = new FormData();
      formData.append('file', blob, fileContent.name);

      let res = await fileRequest(
        routes.addFileToQuiz + quizMode + '/' + quizId,
        'put',
        formData,
        'url',
        token,
      );
      return res;
    });
};

export const removeFile = async (token, filename, quizId) => {
  let query = new URLSearchParams();
  query.append('attach', filename);

  let res = await generalRequest(
    routes.removeFileToQuiz + 'irysc/' + quizId + '?' + query.toString(),
    'delete',
    undefined,
    undefined,
    token,
  );

  if (res !== null) showSuccess(commonTranslator.removeSuccessfully);
  return res;
};
