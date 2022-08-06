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

export const addAgentSchools = async (data, token) => {
  let res = await generalRequest(
    routes.addAgentSchools,
    'post',
    data,
    'data',
    token,
  );
  if (res !== null) showSuccess();

  return res;
};

export const editAgentSchools = async (id, data, token) => {
  let res = await generalRequest(
    routes.editAgentSchools + id,
    'post',
    data,
    undefined,
    token,
  );
  if (res !== null) {
    showSuccess();
    return 'ok';
  }

  return null;
};
