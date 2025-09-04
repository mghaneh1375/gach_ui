import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
import {showSuccess} from '../../../services/utility';
export const getAllStudent = async (token, schoolId = undefined) => {
  return await generalRequest(
    schoolId === undefined
      ? routes.getAllStudent
      : routes.getAllStudent + '/' + schoolId,
    'get',
    undefined,
    'data',
    token,
  );
};
export const addStudents = async (data, token) => {
  const res = await generalRequest(
    routes.addStudents,
    'post',
    data,
    'data',
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
