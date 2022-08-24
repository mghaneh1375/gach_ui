import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchMyQuizze = async (
  token,
  generalMode = undefined,
  status = undefined,
) => {
  let query = new URLSearchParams();
  if (generalMode !== undefined) query.append('generalMode', generalMode);
  if (status !== undefined) query.append('status', status);

  return await generalRequest(
    routes.fetchMyQuizzes + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};
