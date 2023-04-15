import {routes} from '../../../API/APIRoutes';
import {downloadRequest, generalRequest} from '../../../API/Utility';
import {showSuccess} from '../../../services/Utility';

export const addCertificate = async (data, token) => {
  let res = await generalRequest(
    routes.addCertificate,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess();

  return res;
};

export const editCertificate = async (id, data, token) => {
  let res = await generalRequest(
    routes.editCertificate + id,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess();

  return res;
};

export const getCertificates = async token => {
  return await generalRequest(
    routes.fetchAllCertificate,
    'get',
    undefined,
    'data',
    token,
  );
};
export const getCertificate = async (id, token) => {
  return await generalRequest(
    routes.getCertificate + id,
    'get',
    undefined,
    'data',
    token,
  );
};
export const addUserToCert = async (data, id, nid, token) => {
  let res = await generalRequest(
    routes.addUserToCert + id + '/' + nid,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess();

  return res;
};
export const editUserInCert = async (data, id, nid, token) => {
  let res = await generalRequest(
    routes.editUserInCert + id + '/' + nid,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess();

  return res;
};

export const downloadCert = async (certId, NID) => {
  await downloadRequest(routes.issueMyCert + certId + '/' + NID, undefined);
};

export const verifyCert = async (certId, NID) => {
  let res = await generalRequest(
    routes.verifyCert + certId + '/' + NID,
    'post',
    undefined,
    undefined,
    undefined,
  );

  if (res === null) return false;

  await downloadRequest(routes.issueCert + certId + '/' + NID, undefined);
  return true;
};
