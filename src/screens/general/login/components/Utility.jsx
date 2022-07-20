import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

export const getRoleForms = async () => {
  let res = await generalRequest(routes.getRoleForms, 'get', undefined, 'data');
  return res;
};

export const checkSendRoleForm = async (
  userRoleFormData,
  setLoading,
  navigate,
  redirectTo,
  token,
) => {
  setLoading(true);

  Promise.all([
    generalRequest(
      routes.sendRoleForm,
      'post',
      userRoleFormData,
      undefined,
      token,
    ),
  ]).then(res => {
    setLoading(false);
    if (res[0] != null) {
      showSuccess('بررسی میشه میگم نتیجه رو');
      navigate(redirectTo);
    }
  });
};
