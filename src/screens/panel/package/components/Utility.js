import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showError, showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';

export const fetchAllPackages = async (token, quizId = undefined) => {
  return await generalRequest(
    quizId === undefined
      ? routes.fetchAllPackages
      : routes.fetchAllPackages + '?quizId=' + quizId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchAllPackagesDigest = async token => {
  return await generalRequest(
    routes.fetchAllPackagesDigest,
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

const mandatoryFields = ['title', 'gradeId', 'minSelect', 'offPercent'];

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

export const addQuizzesToPackage = async (id, selectedQuizzes, token) => {
  if (selectedQuizzes.length === 0) {
    showError('لطفا آزمون موردنظر خود را انتخاب کنید');
    return null;
  }
  return await generalRequest(
    routes.addQuizzesToPackage + id,
    'put',
    {ids: selectedQuizzes},
    'data',
    token,
  );
};

export const removeQuizzesFromPackage = async (id, selectedQuizzes, token) => {
  if (selectedQuizzes.length === 0) {
    showError('لطفا آزمون موردنظر خود را انتخاب کنید');
    return null;
  }
  return await generalRequest(
    routes.removeQuizzesFromPackage + id,
    'delete',
    {ids: selectedQuizzes},
    'data',
    token,
  );
};
