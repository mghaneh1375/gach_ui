import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const getQuestions = async (token, quizId, quizMode) => {
  return await generalRequest(
    routes.fetchQuestions + quizMode + '/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};
