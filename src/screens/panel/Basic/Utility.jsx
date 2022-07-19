import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {showSuccess} from '../../../services/Utility';
import commonTranslator from '../../../tranlates/Common';

export const removeGrade = async (setLoading, token, gradeId, afterFunc) => {
  setLoading(true);
  let res = await generalRequest(
    routes.removeGrade,
    'delete',
    {items: [gradeId]},
    ['excepts', 'doneIds'],
    token,
  );
  setLoading(false);
  if (res !== null) {
    showSuccess(res.excepts);
    afterFunc(res.doneIds);
  }
};

export const getGrade = async token => {
  let res = await generalRequest(
    routes.fetchGradesAndBranches,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};
export const getLessons = async token => {
  let res = await generalRequest(
    routes.fetchLesson,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};

export const editGrade = async (id, token, data, isOlympiad) => {
  let res = await generalRequest(
    isOlympiad === 'yes' ? routes.editBranch + id : routes.editGrade + id,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);

  return res;
};

export const createGrade = async (token, data, isOlympiad) => {
  let res = await generalRequest(
    isOlympiad === 'yes' ? routes.addBranch : routes.addGrade,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};
