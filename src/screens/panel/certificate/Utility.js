import React from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
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