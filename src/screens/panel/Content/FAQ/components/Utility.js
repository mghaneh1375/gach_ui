import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showError, showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';

export const getAll = async token => {
  return await generalRequest(routes.getFAQ, 'get', undefined, 'data', token);
};

let mandatoryFields = ['question', 'answer', 'visibility', 'priority'];

export const store = async (data, token) => {
  let res = await generalRequest(
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
    let res = await generalRequest(
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
  let res = await generalRequest(
    routes.removeFAQ + id,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
