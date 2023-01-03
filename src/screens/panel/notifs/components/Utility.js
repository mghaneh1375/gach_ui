import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

export const fetchAllNotifs = async (token, from, to) => {
  const params = new URLSearchParams();

  if (from !== null && from !== undefined) params.append('from', from);

  if (to !== null && to !== undefined) params.append('to', to);

  return await generalRequest(
    routes.fetchAllNotifs + '?' + params.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchQuizDigests = async token => {
  return await generalRequest(
    routes.getAllQuizzesDigest + '?isOpenQuizzesNeeded=false',
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchStates = async token => {
  return await generalRequest(
    routes.fetchState,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchGrades = async token => {
  return await generalRequest(
    routes.fetchGradesAndBranches,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchSchools = async token => {
  return await generalRequest(
    routes.fetchSchoolsDigest,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchContentDigests = async token => {
  return await generalRequest(
    routes.fetchContentDigests,
    'get',
    undefined,
    'data',
    token,
  );
};

export const store = async (token, data) => {
  let res = await generalRequest(
    routes.storeNotif,
    'post',
    data,
    ['id', 'usersCount'],
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
