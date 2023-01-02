import {routes} from '../../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';

export const getAll = async token => {
  return await generalRequest(routes.getAdv, 'get', undefined, 'data', token);
};

export const store = async (file, data, token) => {
  let formData = new FormData();
  var myblob = new Blob([new Uint8Array(file.content)]);
  formData.append('file', myblob, file.name);

  let res = await fileRequest(
    routes.addAdv,
    'post',
    formData,
    'data',
    token,
    data,
  );
  if (res !== null) showSuccess();
  return res;
};

export const update = async (id, data, token) => {
  let res = await generalRequest(
    routes.updateAdv + id,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const removeAd = async (id, token) => {
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
