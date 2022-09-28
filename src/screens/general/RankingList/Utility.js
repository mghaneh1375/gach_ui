import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

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
