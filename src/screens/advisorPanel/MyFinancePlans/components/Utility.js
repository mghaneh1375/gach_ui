import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {showSuccess} from '@/services/utility';
const mandatoryFields = ['price', 'title', 'videoCalls', 'visibility'];
export const createNewOffer = async (token, data) => {
  try {
    const res = await generalRequest(
      routes.createNewOffer,
      'post',
      data,
      'data',
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess();
    return res;
  } catch {
    return null;
  }
};
export const updateOffer = async (token, id, data) => {
  try {
    const res = await generalRequest(
      routes.updateOffer + id,
      'put',
      data,
      'data',
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess();
    return res;
  } catch {
    return null;
  }
};
