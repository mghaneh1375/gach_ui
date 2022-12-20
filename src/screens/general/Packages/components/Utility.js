import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchAllPackages = async (isInMyMode, token = undefined) => {
  console.log(isInMyMode);
  return await generalRequest(
    isInMyMode ? routes.fetchMyContents : routes.fetchContents,
    'get',
    undefined,
    ['data', 'min', 'max', 'tags'],
    token,
  );
};

export const fetchPackage = async (slug, token) => {
  return await generalRequest(
    routes.fetchContent + slug,
    'get',
    undefined,
    'data',
    token,
  );
};

export const goToPay = async (token, data, id) => {
  return await generalRequest(
    routes.buyContent + id,
    'post',
    data,
    ['action', 'refId'],
    token,
  );
};
