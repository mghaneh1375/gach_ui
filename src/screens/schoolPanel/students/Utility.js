import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {showSuccess} from '../../../services/Utility';

export const getAllStudent = async token => {
  return await generalRequest(
    routes.getAllStudent,
    'get',
    undefined,
    'data',
    token,
  );
};

export const addStudents = async (data, token) => {
  let res = await generalRequest(
    routes.addStudents,
    'post',
    data,
    'data',
    token,
  );
  if (res !== null) showSuccess();

  return res;
};
