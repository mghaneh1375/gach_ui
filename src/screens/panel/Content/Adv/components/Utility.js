import {routes} from '../../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';

export const getAll = async token => {
  return await generalRequest(routes.getAdv, 'get', undefined, 'data', token);
};

export const store = async (data, token) => {
  let res = await fileRequest(routes.addAdv, 'post', data, 'data', token);
  if (res !== null) showSuccess();
  return res;
};

export const remove = async (id, token) => {
  let res = await generalRequest(
    routes.removeAdv + id,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
