import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const getPackage = async (token, packageId) => {
  return await generalRequest(
    routes.fetchPackage + packageId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const goToPayCustomUrl = async (token, url, data) => {
  return await generalRequest(url, 'post', data, ['action', 'refId'], token);
};

export const goToPay = async (token, data) => {
  return await generalRequest(
    routes.buyQuiz,
    'post',
    data,
    ['action', 'refId'],
    token,
  );
};

export const goToPayGroup = async (token, data) => {
  return await generalRequest(
    routes.groupBuyQuiz,
    'post',
    data,
    ['action', 'refId'],
    token,
  );
};
