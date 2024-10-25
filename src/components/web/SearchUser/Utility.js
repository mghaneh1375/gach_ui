import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const search = async (token, mode, name, lastName, phone, mail, NID) => {
  let query = new URLSearchParams();

  if (mode === 'name') {
    if (name !== undefined) query.append('name', name);
    if (lastName !== undefined) query = query.append('lastname', lastName);
  } else if (mode === 'phone') query.append('phone', phone);
  else if (mode === 'mail') query.append('mail', mail);
  else if (mode === 'NID') query.append('NID', NID);

  let res = await generalRequest(
    routes.fetchTinyUser + query.toString(),
    'get',
    undefined,
    'users',
    token,
  );

  if (res === null) return [];

  return res;
};
