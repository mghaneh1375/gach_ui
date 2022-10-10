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
  if (
    userRoleFormData['role'] === 'student' &&
    Object.keys(userRoleFormData).length === 1
  ) {
    if (redirectTo !== undefined) window.location.href = redirectTo;
    return;
  }

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
      if (userRoleFormData['role'] === 'student')
        showSuccess('کد معرف به درستی ثبت گردید.');
      else
        showSuccess(
          'فرم شما با موفقیت ثبت گردید و در انتظار تایید ادمین قرار گرفته است.',
        );
      if (redirectTo !== undefined) window.location.href = redirectTo;
    }
  });
};
