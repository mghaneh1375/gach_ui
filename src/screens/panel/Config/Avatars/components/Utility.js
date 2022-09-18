import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';

export const setAsDefault = async (avatarId, setLoading, token, setDefault) => {
  setLoading(true);

  let res = await generalRequest(
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

  let res = await generalRequest(
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
