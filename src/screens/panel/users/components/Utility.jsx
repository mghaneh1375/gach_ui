import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';

export const filter = (props, level) => {
  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.fetchAllUsers + level,
      'get',
      undefined,
      'users',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    res[0] = [
      {
        id: 'Asdqwasd',
        name: 'ASdqwasd',
        mail: 'Ascx',
        phone: 'xcqeqw',
        NID: '0018914373',
        status: 'active',
      },
    ];
    // if (res[0] == null) {
    // props.navigate('/');
    // return;
    // }
    props.setData(res[0]);
  });
};

export const addAccess = async (
  setLoading,
  token,
  userId,
  newRole,
  afterFunc,
) => {
  setLoading(true);
  let res = await generalRequest(
    routes.addAccess + userId + '/' + newRole,
    'put',
    undefined,
    undefined,
    token,
  );
  setLoading(false);
  if (res !== undefined) {
    showSuccess(commonTranslator.success);

    afterFunc();
  }
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
