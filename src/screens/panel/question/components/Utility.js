import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const getSubjects = async token => {
  return await generalRequest(
    routes.getSubjectQuestions,
    'get',
    undefined,
    'data',
    token,
  );
};
