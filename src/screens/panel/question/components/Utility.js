import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

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
