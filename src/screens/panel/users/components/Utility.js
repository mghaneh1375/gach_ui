import {routes} from '../../../../API/APIRoutes';
import {getUser, setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';
import {levelKeyVals} from '../../ticket/components/KeyVals';

export const filter = async (
  token,
  level,
  NID = undefined,
  phone = undefined,
  name = undefined,
  lastname = undefined,
  grade = undefined,
  branch = undefined,
) => {
  let query = new URLSearchParams();

  query.append('level', level);
  if (NID !== undefined) query.append('NID', NID);
  if (phone !== undefined) query.append('phone', phone);
  if (name !== undefined) query.append('name', name);
  if (lastname !== undefined) query.append('lastname', lastname);
  if (grade !== undefined) query.append('gradeId', grade);
  if (branch !== undefined) query.append('branchId', branch);

  let res = await generalRequest(
    routes.fetchAllUsers + '?' + query.toString(),
    'get',
    undefined,
    'users',
    token,
  );
  return res;
};

export const removeAccess = props => {
  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.removeAccess + props.userId + '/' + props.access,
      'delete',
      undefined,
      'accesses',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) {
      showSuccess(commonTranslator.success);
      props.afterFunc(
        res[0].map(elem => {
          return {
            id: elem,
            title: levelKeyVals.find(level => level.id === elem).item,
          };
        }),
      );
    }
  });
};

export const addAccess = async (
  setLoading,
  token,
  userId,
  newRole,
  afterFunc,
  schoolId = undefined,
) => {
  setLoading(true);
  let res = await generalRequest(
    schoolId === undefined
      ? routes.addAccess + userId + '/' + newRole
      : routes.addAccess + userId + '/' + newRole + '/' + schoolId,
    'put',
    undefined,
    'accesses',
    token,
  );
  setLoading(false);
  if (res !== null) {
    showSuccess(commonTranslator.success);
    afterFunc(
      res.map(elem => {
        return {
          id: elem,
          title: levelKeyVals.find(level => level.id === elem).item,
        };
      }),
    );
    return 'ok';
  }
  return null;
};

export const toggleStatus = async (setLoading, token, userId, afterFunc) => {
  setLoading(true);
  let res = await generalRequest(
    routes.toggleStatus + userId,
    'put',
    undefined,
    'newStatus',
    token,
  );
  setLoading(false);
  if (res !== undefined) {
    showSuccess(commonTranslator.success);
    afterFunc(res);
  }
};

export const login = async (setLoading, token, userId) => {
  setLoading(true);
  let res = await generalRequest(
    routes.adminLogin + userId,
    'post',
    undefined,
    ['user', 'token'],
    token,
  );
  setLoading(false);
  if (res !== null) {
    await setCacheItem('token_sec', token);
    let adminUser = await getUser();
    await setCacheItem('user_sec', adminUser);
    await setCacheItem('token', res.token);
    await setCacheItem('user', JSON.stringify(res.user));
    return true;
  }
  return false;
};

export const chargeAccount = async (coin, money, userId, token) => {
  let res = await generalRequest(
    routes.chargeAccount + userId,
    'post',
    {
      amount: money,
      coin: coin,
    },
    undefined,
    token,
  );

  if (res !== null) showSuccess();
};
