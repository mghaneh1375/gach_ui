import {routes} from '../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';

export const getSubjects = async token => {
  return await generalRequest(
    routes.getSubjectQuestions,
    'get',
    undefined,
    'data',
    token,
  );
};

export const filter = async (
  token,
  grade,
  lesson,
  subject,
  criticalThresh,
  justCriticals,
  isQuestionsNeeded = false,
) => {
  let query = new URLSearchParams();

  if (grade !== undefined && lesson === undefined)
    query.append('gradeId', grade);

  if (lesson !== undefined) query.append('lessonId', lesson);

  if (subject !== undefined) query.append('subjectId', subject);

  if (isQuestionsNeeded !== undefined && isQuestionsNeeded)
    query.append('isQuestionNeeded', true);

  if (
    justCriticals !== undefined &&
    justCriticals === 'yes' &&
    criticalThresh !== undefined
  )
    query.append('criticalThresh', criticalThresh);

  return await generalRequest(
    routes.getSubjectQuestions + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};

export const addQuestionToQuizzes = async (
  questionOrganizationId,
  mode,
  quizzes,
  token,
) => {
  return await generalRequest(
    routes.addQuestionToQuizzes + mode + '/' + questionOrganizationId + '/3',
    'put',
    {items: quizzes},
    ['excepts', 'doneIds'],
    token,
  );
};

export const removeQuestion = async (questionId, token) => {
  return await generalRequest(
    routes.removeQuestion,
    'delete',
    {
      items: [questionId],
    },
    ['excepts', 'doneIds'],
    token,
  );
};

export const getAuthorsKeyVals = async token => {
  return await generalRequest(
    routes.getAuthorsKeyVals,
    'get',
    undefined,
    'data',
    token,
  );
};

export const getSubjectsKeyVals = async token => {
  return await generalRequest(
    routes.getSubjectsKeyVals,
    'get',
    undefined,
    'data',
    token,
  );
};

export const addQuestion = async (
  subjectId,
  data,
  questionFile,
  answerFile,
  token,
) => {
  let formData = new FormData();

  var myblob = new Blob([new Uint8Array(questionFile.content)]);
  formData.append('questionFile', myblob, questionFile.name);

  if (answerFile !== undefined) {
    var myblob2 = new Blob([new Uint8Array(answerFile.content)]);
    formData.append('answerFile', myblob2, answerFile.name);
  }

  try {
    let res = await fileRequest(
      routes.addQuestion + subjectId,
      'post',
      formData,
      'id',
      token,
      data,
      [
        'level',
        'authorId',
        'neededTime',
        'answer',
        'organizationId',
        'kindQuestion',
      ],
    );

    if (res !== null) showSuccess(commonTranslator.success);

    return res;
  } catch (e) {
    return null;
  }
};
