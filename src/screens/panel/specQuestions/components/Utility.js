import {routes} from '@/api/apiRoutes';
import {fileRequest, generalRequest} from '@/api/utility';
import {showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
export const filter = async (token, organizationCode) => {
  const query = new URLSearchParams();
  if (organizationCode !== undefined)
    query.append('organizationCode', organizationCode);
  return await generalRequest(
    routes.getEscapeQuizQuestions + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};
export const addQuestionToQuizzes = async (
  questionOrganizationId,
  quizzes,
  token,
) => {
  return await generalRequest(
    routes.addQuestionToQuizzes + 'escape/' + questionOrganizationId + '/3',
    'put',
    {
      items: quizzes,
    },
    ['excepts', 'doneIds'],
    token,
  );
};
export const removeQuestion = async (questionId, token) => {
  return await generalRequest(
    routes.removeEscapeQuizQuestion,
    'delete',
    {
      items: [questionId],
    },
    ['excepts', 'doneIds'],
    token,
  );
};
export const addQuestion = async (data, questionFile, answerFile, token) => {
  const formData = new FormData();
  var myblob = new Blob([new Uint8Array(questionFile.content)]);
  formData.append('questionFile', myblob, questionFile.name);
  if (answerFile !== undefined) {
    var myblob2 = new Blob([new Uint8Array(answerFile.content)]);
    formData.append('answerFile', myblob2, answerFile.name);
  }
  try {
    const res = await fileRequest(
      routes.addEscapeQuizQuestion,
      'post',
      formData,
      'id',
      token,
      data,
      ['answer', 'organizationId'],
    );
    if (res !== null) showSuccess(commonTranslator.success);
    return res;
  } catch (e) {
    return null;
  }
};
export const editQuestion = async (
  questionId,
  data,
  questionFile,
  answerFile,
  token,
) => {
  const formData = new FormData();
  if (questionFile !== undefined) {
    var myblob = new Blob([new Uint8Array(questionFile.content)]);
    formData.append('questionFile', myblob, questionFile.name);
  }
  if (answerFile !== undefined) {
    var myblob2 = new Blob([new Uint8Array(answerFile.content)]);
    formData.append('answerFile', myblob2, answerFile.name);
  }
  try {
    const res = await fileRequest(
      routes.editEscapeQuizQuestion + questionId,
      'post',
      formData,
      undefined,
      token,
      data,
      ['answer', 'organizationId'],
    );
    if (res !== null) showSuccess(commonTranslator.success);
    return 'ok';
  } catch (e) {
    return null;
  }
};
