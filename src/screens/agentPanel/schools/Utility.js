import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {showSuccess} from '@/services/utility';
export const getAllAgent = async token => {
  return await generalRequest(
    routes.getAllAgent,
    'get',
    undefined,
    'data',
    token,
  );
};
export const addSchool = async (data, token) => {
  try {
    const res = await generalRequest(
      routes.addSchoolByAgent,
      'post',
      data,
      undefined,
      token,
      ['tel', 'NID', 'phone', 'name', 'address', 'managerName'],
    );
    if (res !== null) showSuccess('درخواست شما در انتظار تایید قرار گرفت');
    return res;
  } catch (error) {
    return null;
  }
};
export const addExistSchool = async (data, token) => {
  try {
    const res = await generalRequest(
      routes.addExistSchoolByAgent,
      'post',
      data,
      undefined,
      token,
      ['NID', 'phone'],
    );
    if (res !== null) showSuccess('درخواست شما در انتظار تایید قرار گرفت');
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
    'data',
    token,
  );
};
