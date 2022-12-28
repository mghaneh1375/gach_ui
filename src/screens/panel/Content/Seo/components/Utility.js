import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showError, showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';

export const getAll = async (token, packageId = undefined) => {
  return await generalRequest(
    packageId === undefined || packageId == null
      ? routes.getSeo
      : routes.getSeo + packageId,
    'get',
    undefined,
    ['data', 'id'],
    token,
  );
};

let mandatoryFields = ['key', 'value'];

export const store = async (data, token, packageId = undefined) => {
  try {
    let res = await generalRequest(
      packageId == null || packageId === undefined
        ? routes.addSeo
        : routes.addSeo + packageId,
      'post',
      data,
      undefined,
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess();
    return res;
  } catch (e) {
    showError(commonTranslator.pleaseFillAllFields);
    return null;
  }
};

export const remove = async (id, key, token) => {
  let res = await generalRequest(
    routes.removeSeo + id,
    'delete',
    {
      key: key,
    },
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
