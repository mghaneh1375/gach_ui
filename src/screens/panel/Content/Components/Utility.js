import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchContents = async token => {
  return await generalRequest(
    routes.fetchContents,
    'get',
    undefined,
    'data',
    token,
  );
};
