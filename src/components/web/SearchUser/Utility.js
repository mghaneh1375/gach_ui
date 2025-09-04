import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
export const search = async (token, mode, name, lastName, phone, mail, NID) => {
  const query = new URLSearchParams();
  if (mode === 'name') {
    if (name !== undefined) query.append('name', name);
    if (lastName !== undefined) query.append('lastname', lastName);
  } else if (mode === 'phone') query.append('phone', phone);
  else if (mode === 'mail') query.append('mail', mail);
  else if (mode === 'NID') query.append('NID', NID);
  const res = await generalRequest(
    routes.fetchTinyUser + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
  if (res === null) return [];
  console.log(res);
  return res.users;
};
