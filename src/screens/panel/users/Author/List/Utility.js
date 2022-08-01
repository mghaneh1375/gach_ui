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
    tag === undefined || tag.length === 0
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

export const getTransations = async (authorId, token) => {
  return await generalRequest(
    routes.getAuthorTransactions + authorId,
    'get',
    undefined,
    'data',
    token,
  );
};

export const createTransaction = async (authorId, data, token) => {
  let res = await generalRequest(
    routes.createAuthorTransaction + authorId,
    'post',
    data,
    ['sumPayment', 'lastTransaction', 'id'],
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);

  return res;
};

export const getLastTransaction = async (authorId, token) => {
  return await generalRequest(
    routes.getAuthorLastTransaction + authorId,
    'get',
    undefined,
    ['sumPayment', 'lastTransaction'],
    token,
  );
};
