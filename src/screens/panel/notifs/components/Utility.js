import {routes} from '../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

export const fetchAllNotifs = async (
  token,
  sendVia,
  from = undefined,
  to = undefined,
) => {
  const params = new URLSearchParams();
  params.append('sendVia', sendVia);

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

export const store = async (token, data, fileContent) => {
  if (fileContent !== undefined) {
    var myblob = new Blob([new Uint8Array(fileContent.content)]);
    let formData = new FormData();
    formData.append('file', myblob, fileContent.name);

    let res = await fileRequest(
      routes.storeNotif,
      'post',
      formData,
      ['id', 'usersCount', 'createdAt'],
      token,
      data,
    );

    if (res !== null) showSuccess();
    return res;
  }

  let res = await generalRequest(
    routes.storeNotif,
    'post',
    data,
    ['id', 'usersCount', 'createdAt'],
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const simpleStore = async (token, data) => {
  let res = await generalRequest(
    routes.simpleStoreNotif,
    'post',
    data,
    ['id', 'usersCount', 'createdAt'],
    token,
  );
  if (res !== null) showSuccess();
  return res;
};

export const getStudents = async (token, id) => {
  return await generalRequest(
    routes.getNotifStudents + id,
    'get',
    undefined,
    'data',
    token,
  );
};

export const getNotif = async (token, id) => {
  return await generalRequest(
    routes.getNotif + id,
    'get',
    undefined,
    'data',
    token,
  );
};
