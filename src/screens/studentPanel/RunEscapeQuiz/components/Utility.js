import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const reviewQuiz = async (quizId, token) => {
  return await generalRequest(
    routes.reviewQuiz + 'escape/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const doQuiz = async (quizId, token) => {
  return await generalRequest(
    routes.doQuiz + 'escape/' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const doSaveAnswer = async (answer, quizId, questionId, token) => {
  return await generalRequest(
    routes.storeEscapeQuizAnswer + quizId + '/' + questionId,
    'put',
    {
      answer: answer,
    },
    ['reminder', 'isCorrect'],
    token,
  );
};
