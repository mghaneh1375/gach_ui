import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const search = async (token, mode, name, lastName, phone, mail, NID) => {
  let query;

  if (mode === 'name') {
    if (name !== undefined) query = 'name=' + name;
    if (lastName !== undefined)
      query =
        query === undefined
          ? 'lastname=' + lastName
          : query + '&lastname=' + lastName;
  } else if (mode === 'phone') query = 'phone=' + phone;
  else if (mode === 'mail') query = 'mail=' + mail;
  else if (mode === 'NID') query = 'NID=' + NID;

  let res = await generalRequest(
    routes.fetchTinyUser + query,
    'get',
    undefined,
    'users',
    token,
  );

  if (res === null) return [];

  return res;
};
