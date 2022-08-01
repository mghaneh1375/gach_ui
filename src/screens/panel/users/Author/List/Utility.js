import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../tranlates/Common';

export const createAuthor = async (token, data) => {
  let res = await generalRequest(
    routes.createAuthor,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};

export const editAuthor = async (token, authorId, data) => {
  let res = await generalRequest(
    routes.editAuthor + authorId,
    'post',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};

export const filter = async (setLoading, token, setData, tag) => {
  setLoading(true);
  let res = await generalRequest(
    tag === undefined
      ? routes.getAllAuthors
      : routes.getAllAuthors + '?tag=' + tag,
    'get',
    undefined,
    'data',
    token,
  );
  setLoading(false);
  if (res !== null) {
    setData(res);
    return 'ok';
  }
  return res;
};
