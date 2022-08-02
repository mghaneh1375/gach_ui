import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';

export const getConfig = async token => {
  return await generalRequest(
    routes.getGiftConfig,
    'get',
    undefined,
    'data',
    token,
  );
};
export const getAllGift = async token => {
  return await generalRequest(
    routes.getAllGift,
    'get',
    undefined,
    'data',
    token,
  );
};
export const addGift = async (data, token) => {
  let res = await generalRequest(routes.addGift, 'post', data, 'data', token);
  if (res !== null) showSuccess();

  return res;
};
