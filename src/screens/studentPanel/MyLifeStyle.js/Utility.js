import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const fetchMyLifeStyle = token => {
  return generalRequest(routes.myLifeStyle, 'get', undefined, 'data', token);
};

export const fetchLifeStyleTags = token => {
  return generalRequest(routes.getAllLife, 'get', undefined, 'data', token);
};
export const fetchExamTags = token => {
  return generalRequest(routes.getAllExamTags, 'get', undefined, 'data', token);
};
