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

export const fetchPackage = async (packageId, token) => {
  return await generalRequest(
    routes.fetchContent + packageId,
    'get',
    undefined,
    'data',
    token,
  );
};
