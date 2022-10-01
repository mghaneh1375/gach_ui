import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

export const fetchMyQuizzes = async token => {
  return await generalRequest(
    routes.fetchMyCustomQuizzes,
    'get',
    undefined,
    'data',
    token,
  );
};
