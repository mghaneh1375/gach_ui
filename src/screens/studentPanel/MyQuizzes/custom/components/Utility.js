import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
export const fetchMyQuizzes = async token => {
  return await generalRequest(
    routes.fetchMyCustomQuizzes,
    'get',
    undefined,
    'data',
    token,
  );
};
