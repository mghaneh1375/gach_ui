import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';

export const fetchAllPackages = async token => {
  return await generalRequest(
    routes.fetchAllPackages,
    'get',
    undefined,
    'data',
    token,
  );
};

export const editPackage = async (id, token, data) => {
  let res = await generalRequest(
    routes.editPackage + id,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);

  return res;
};

export const createPackage = async (token, data) => {
  let res = await generalRequest(
    routes.createPackage,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};
