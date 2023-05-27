import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const reviewQuiz = async (quizId, token) => {
  return await generalRequest(
    routes.reviewQuiz + 'onlineStanding/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const doQuiz = async (quizId, token) => {
  return await generalRequest(
    routes.doQuiz + 'onlineStanding/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const doSaveAnswer = async (answer, quizId, questionId, token) => {
  return await generalRequest(
    routes.storeOnlineQuizAnswer + quizId + '/' + questionId,
    'put',
    {
      answer: answer,
    },
    ['reminder'],
    token,
  );
};
