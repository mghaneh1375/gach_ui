import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const getProgressData = (token, userId) => {
  return generalRequest(
    routes.studentProgress + userId,
    'get',
    undefined,
    'data',
    token,
  );
};
