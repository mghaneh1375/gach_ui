import {CommonWebBox, SimpleText} from '../../../../../styles/Common';
import { routs } from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

export const create = async (token, gradeId, lessonId, data) => {
  let res = await generalRequest(
    routes.addSubject + gradeId + '/' + lessonId,
    'post',
    data,
    ['id', 'code'],
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};


