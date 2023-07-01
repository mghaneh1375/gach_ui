import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchSubjects = () => {};

export const fetchTags = token => {
  return generalRequest(routes.getAllTags, 'get', undefined, 'data', token);
};

export const fetchSchedules = (token, userId) => {
  return generalRequest(routes.getAllTags, 'get', undefined, 'data', token);
};
