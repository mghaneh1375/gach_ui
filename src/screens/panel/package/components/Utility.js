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

export const fetchPackageQuizzes = async (token, id) => {
  return await generalRequest(
    routes.fetchPackageQuizzes + id,
    'get',
    undefined,
    'data',
    token,
  );
};

const mandatoryFields = [
  'title',
  'gradeId',
  'minSelect',
  'offPercent',
  'lessonId',
];

export const editPackage = async (id, token, data) => {
  try {
    let res = await generalRequest(
      routes.updatePackage + id,
      'put',
      data,
      undefined,
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess(commonTranslator.success);

    return res;
  } catch (e) {
    return null;
  }
};

export const createPackage = async (token, data) => {
  try {
    let res = await generalRequest(
      routes.createPackage,
      'post',
      data,
      'id',
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess(commonTranslator.success);
    return res;
  } catch (e) {
    return null;
  }
};
