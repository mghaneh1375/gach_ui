import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const goToPay = async (token, data) => {
  return await generalRequest(
    routes.buyQuiz,
    'post',
    data,
    ['action', 'refId'],
    token,
  );
};

export const goToPayGroup = async (token, data) => {
  return await generalRequest(
    routes.groupBuyQuiz,
    'post',
    data,
    ['action', 'refId'],
    token,
  );
};
