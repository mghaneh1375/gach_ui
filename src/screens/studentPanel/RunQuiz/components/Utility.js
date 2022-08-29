import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

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
