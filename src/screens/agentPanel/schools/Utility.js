import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {showSuccess} from '../../../services/Utility';

export const getAllAgentSchools = async token => {
  return await generalRequest(
    routes.getAllAgentSchools,
    'get',
    undefined,
    'data',
    token,
  );
};

export const addSchool = async (data, token) => {
  try {
    let res = await generalRequest(
      routes.addSchoolByAgent,
      'post',
      data,
      'id',
      token,
      ['tel', 'NID', 'phone', 'name', 'address', 'managerName'],
    );
    if (res !== null) {
      if (res == -1) {
        showSuccess('درخواست شما در انتظار تایید قرار گرفت');
      } else {
        showSuccess();
      }
    }

    return res;
  } catch (error) {
    return null;
  }
};

export const checkDuplicate = async (data, token) => {
  return await generalRequest(
    routes.checkDuplicate,
    'post',
    data,
    'exist',
    token,
  );
};
