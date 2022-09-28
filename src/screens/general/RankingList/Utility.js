import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const fetchRankingList = async () => {
  return await generalRequest(
    routes.fetchRankingList,
    'get',
    undefined,
    'data',
    undefined,
  );
};
