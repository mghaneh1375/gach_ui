import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';

export const fetchData = async token => {
  return await generalRequest(
    routes.fetchAllTarazLevels,
    'get',
    undefined,
    'data',
    token,
  );
};

export const create = async (data, token) => {
  let res = await generalRequest(
    routes.createTarazLevel,
    'post',
    data,
    'id',
    token,
  );

  if (res !== null) showSuccess();

  return res;
};
