import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchAllPackages = async (token = undefined) => {
  return await generalRequest(
    routes.fetchContents,
    'get',
    undefined,
    'data',
    token,
  );
};
