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
  userId = undefined,
) => {
  setLoading(true);
  Promise.all([
    generalRequest(
      userId === undefined ? routes.sendRoleForm : routes.sendRoleForm + userId,
      'post',
      userRoleFormData,
      undefined,
      token,
    ),
  ]).then(res => {
    setLoading(false);
    if (res[0] != null) {
      showSuccess(
        'فرم شما با موفقیت ثبت گردید و در انتظار تایید ادمین قرار گرفته است.',
      );
      if (redirectTo !== undefined) navigate(redirectTo);
    }
  });
};
