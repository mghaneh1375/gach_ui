import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../../../api/utility';
import {showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
export const setAsDefault = async (avatarId, setLoading, token, setDefault) => {
  setLoading(true);
  const res = await generalRequest(
    routes.setAvatarAsDefault + avatarId,
    'post',
    undefined,
    undefined,
    token,
  );
  setLoading(false);
  if (res !== null) {
    setDefault(avatarId);
    showSuccess(commonTranslator.success);
  }
};
export const remove = async (
  avatarId,
  setLoading,
  token,
  setDefault,
  removeAvatar,
) => {
  setLoading(true);
  const res = await generalRequest(
    routes.deleteAvatar + avatarId,
    'delete',
    undefined,
    'default',
    token,
  );
  setLoading(false);
  if (res !== null) {
    if (res !== 'no_change') setDefault(res);
    removeAvatar(avatarId);
    showSuccess(commonTranslator.success);
  }
};
