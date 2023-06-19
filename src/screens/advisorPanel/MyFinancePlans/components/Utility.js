import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

const mandatoryFields = ['price', 'title', 'videoCalls', 'visibility'];

export const createNewOff = async (token, data) => {
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
};
