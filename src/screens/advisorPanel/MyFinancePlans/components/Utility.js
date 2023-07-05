import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

const mandatoryFields = ['price', 'title', 'videoCalls', 'visibility'];

export const createNewOffer = async (token, data) => {
  try {
    let res = await generalRequest(
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
    let res = await generalRequest(
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
