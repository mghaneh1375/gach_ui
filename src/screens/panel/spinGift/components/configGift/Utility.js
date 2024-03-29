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
export const updateGift = async (data, token) => {
  let res = await generalRequest(
    routes.updateGiftConfig,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
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
export const editGift = async (id, data, token) => {
  let res = await generalRequest(
    routes.editGift + id,
    'post',
    data,
    undefined,
    token,
  );
  if (res !== null) {
    showSuccess();
    return 'ok';
  }

  return null;
};
