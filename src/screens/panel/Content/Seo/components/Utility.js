import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../../../api/utility';
import {showError, showSuccess} from '../../../../../services/utility';
import commonTranslator from '@/translator/common';
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
const mandatoryFields = ['key', 'value'];
export const store = async (data, token, packageId = undefined) => {
  try {
    const res = await generalRequest(
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
  const res = await generalRequest(
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
