import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {showError, showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
export const getAll = async (token, packageId = undefined) => {
  return await generalRequest(
    packageId === undefined || packageId == null
      ? routes.getFAQ
      : routes.getFAQ + '?contentId=' + packageId,
    'get',
    undefined,
    ['data', 'id'],
    token,
  );
};
const mandatoryFields = ['question', 'answer', 'visibility', 'priority'];
export const store = async (data, token, packageId = undefined) => {
  try {
    const res = await generalRequest(
      packageId == null || packageId === undefined
        ? routes.addFAQ
        : routes.addFAQ + '?contentId=' + packageId,
      'post',
      data,
      'data',
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
export const update = async (id, data, token, packageId = undefined) => {
  try {
    const res = await generalRequest(
      packageId === undefined
        ? routes.updateFAQ + id
        : routes.updateFAQ + id + '?contentId=' + packageId,
      'put',
      data,
      'data',
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
export const remove = async (id, token, packageId = undefined) => {
  const res = await generalRequest(
    packageId === undefined
      ? routes.removeFAQ + id
      : routes.removeFAQ + id + '?contentId=' + packageId,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
