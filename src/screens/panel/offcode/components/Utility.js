import {generalUpdate} from '../../../../services/Utility';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

export const mandatoryFields = ['expireAt', 'type', 'amount'];

export const typeKeyVals = [
  {item: translator.value, id: 'value'},
  {item: translator.percent, id: 'percent'},
];

export const allTypeKeyVals = [
  {item: translator.value, id: 'value'},
  {item: translator.percent, id: 'percent'},
  {item: commonTranslator.all, id: 'all'},
];

export const usedKeyVals = [
  {item: translator.used, id: true},
  {item: translator.notUsed, id: false},
  {item: commonTranslator.all, id: 'all'},
];
export const update = (url, off, setLoading, token, afterUpdate) => {
  generalUpdate(url, off, setLoading, token, afterUpdate, mandatoryFields);
};

export const backToList = setMode => {
  setMode('list');
};

export const filter = (
  props,
  used,
  type,
  createdAt,
  createdAtEndLimit,
  expiredAt,
  expiredAtEndLimit,
) => {
  let query = new URLSearchParams();

  if (type !== undefined && type !== 'all') query.append('type', type);

  if (used !== undefined && used !== 'all') query.append('used', used);

  if (createdAt !== undefined && createdAt.length > 0)
    query.append('createdAt', createdAt);

  if (createdAtEndLimit !== undefined && createdAtEndLimit.length > 0)
    query.append('createdAtEndLimit', createdAtEndLimit);

  if (expiredAt !== undefined && expiredAt.length > 0)
    query.append('expiredAt', expiredAt);

  if (expiredAtEndLimit !== undefined && expiredAtEndLimit > 0)
    query.append('expiredAtEndLimit', expiredAtEndLimit);

  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.fetchAllOffs + '?' + query.toString(),
      'get',
      undefined,
      'data',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) {
      props.setData(res[0]);
    }
  });
};
