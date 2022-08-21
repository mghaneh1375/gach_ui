import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchRegistrablePackages = async () => {
  return await generalRequest(
    routes.fetchAllPackages,
    'get',
    undefined,
    'data',
    undefined,
  );
};
