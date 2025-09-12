import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
export const fetchRankingList = async (gradeId = undefined) => {
  return await generalRequest(
    gradeId === undefined
      ? routes.fetchRankingList
      : routes.fetchRankingList + '?gradeId=' + gradeId,
    'get',
    undefined,
    'data',
    undefined,
  );
};
export const fetchFinishedQuizzes = async () => {
  return await generalRequest(
    routes.fetchFinishedQuizzes,
    'get',
    undefined,
    'data',
    undefined,
  );
};
