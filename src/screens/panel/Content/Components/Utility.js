import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showError, showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';

export const fetchContents = async token => {
  return await generalRequest(
    routes.fetchContents,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchContent = async (id, token = undefined) => {
  return await generalRequest(
    routes.fetchContent + id,
    'get',
    undefined,
    'data',
    token,
  );
};

let mandatoryFields = [
  'title',
  'description',
  'teacher',
  'price',
  'sessionsCount',
  'visibility',
];

export const store = async (token, data) => {
  try {
    let res = await generalRequest(
      routes.storeContent,
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
