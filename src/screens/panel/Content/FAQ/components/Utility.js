import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {showError, showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
export const getAll = async token => {
  return await generalRequest(routes.getFAQ, 'get', undefined, 'data', token);
};
const mandatoryFields = ['question', 'answer', 'visibility', 'priority'];
export const store = async (data, token) => {
  const res = await generalRequest(
    routes.addFAQ,
    'post',
    data,
    'data',
    token,
    mandatoryFields,
  );
  if (res !== null) showSuccess();
  return res;
};
export const update = async (id, data, token) => {
  try {
    const res = await generalRequest(
      routes.updateFAQ + id,
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
export const remove = async (id, token) => {
  const res = await generalRequest(
    routes.removeFAQ + id,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
