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
