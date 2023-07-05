import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

export const fetchMyQuizzes = async (token, advisor, status = undefined) => {
  let query = new URLSearchParams();
  query.append('forAdvisor', advisor);
  if (status !== undefined) query.append('status', status);

  return await generalRequest(
    routes.fetchMySchoolQuizzes + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};

export const getMyAnswerSheet = async (quizId, generalMode, token) => {
  return await generalRequest(
    routes.fetchMyAnswerSheet + generalMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};
