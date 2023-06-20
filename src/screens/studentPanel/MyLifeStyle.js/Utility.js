import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {showSuccess} from '../../../services/Utility';

export const fetchMyLifeStyle = (token, userId) => {
  return generalRequest(
    userId === undefined ? routes.myLifeStyle : routes.myLifeStyle + userId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchLifeStyleTags = token => {
  return generalRequest(routes.getAllLife, 'get', undefined, 'data', token);
};
export const fetchExamTags = token => {
  return generalRequest(routes.getAllExamTags, 'get', undefined, 'data', token);
};

export const setMyExamInLifeStyle = async (data, token) => {
  let res = await generalRequest(
    routes.setMyExamInLifeStyle,
    'put',
    data,
    undefined,
    token,
  );
  if (res != null) showSuccess();
  return res;
};

export const addItemToDay = async (data, token) => {
  let res = await generalRequest(
    routes.addItemToMyLifeStyle,
    'put',
    data,
    'id',
    token,
  );
  if (res != null) showSuccess();
  return res;
};

export const removeItemFromDay = async (data, token) => {
  let res = await generalRequest(
    routes.removeItemFromMyLifeStyle,
    'delete',
    data,
    undefined,
    token,
  );
  if (res != null) showSuccess();
  return res;
};
