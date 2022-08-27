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
export const expiredKeyVals = [
  {item: commonTranslator.no, id: false},
  {item: commonTranslator.yes, id: true},
];

export const allTypeKeyVals = [
  {item: translator.value, id: 'value'},
  {item: translator.percent, id: 'percent'},
  {item: commonTranslator.all, id: 'all'},
];

export const allWithCodeKeyVals = [
  {item: translator.withCode, id: 'withCode'},
  {item: translator.withoutCode, id: 'withoutCode'},
  {item: commonTranslator.all, id: 'all'},
];

export const withCodeKeyVals = [
  {item: translator.withCode, id: 'withCode'},
  {item: translator.withoutCode, id: 'withoutCode'},
];

export const usedKeyVals = [
  {item: translator.used, id: true},
  {item: translator.notUsed, id: false},
  {item: commonTranslator.all, id: 'all'},
];

export const sectionKeyVals = [
  {item: translator.gachExam, id: 'gach_exam'},
  {item: translator.bankExam, id: 'bank_exam'},
  {item: translator.book, id: 'book'},
  {item: translator.classes, id: 'classes'},
  {item: translator.ravanExam, id: 'ravan_exam'},
  {item: translator.counseling, id: 'counseling'},
  {item: commonTranslator.all, id: 'all'},
];
export const usedOffKeyVals = [
  {item: commonTranslator.no, id: false},
  {item: commonTranslator.yes, id: true},
];
export const update = async (url, off, token) => {
  return await generalRequest(url, 'put', off, 'data', token);
};

export const backToList = setMode => {
  setMode('list');
};

export const filter = (
  props,
  used,
  type,
  isPublic,
  withCode,
  hasExpired,
  createdAt,
  createdAtEndLimit,
  expiredAt,
  expiredAtEndLimit,
  usedAt,
  usedAtEndLimit,
) => {
  let query = new URLSearchParams();

  if (type !== undefined && type !== 'all') query.append('type', type);

  if (used !== undefined && used !== 'all') query.append('used', used);

  if (isPublic !== undefined && isPublic !== 'all')
    query.append('isPublic', isPublic);

  if (withCode !== undefined && withCode !== 'all')
    query.append('withCode', withCode);

  if (hasExpired !== undefined && hasExpired !== 'all')
    query.append('hasExpired', hasExpired);

  if (createdAt !== undefined && createdAt.length > 0)
    query.append('createdAt', createdAt);

  if (createdAtEndLimit !== undefined && createdAtEndLimit.length > 0)
    query.append('createdAtEndLimit', createdAtEndLimit);

  if (expiredAt !== undefined && expiredAt > 0)
    query.append('expiredAt', expiredAt);

  if (expiredAtEndLimit !== undefined && expiredAtEndLimit > 0)
    query.append('expiredAtEndLimit', expiredAtEndLimit);

  if (usedAt !== undefined && usedAt > 0) query.append('usedAt', usedAt);

  if (usedAtEndLimit !== undefined && usedAtEndLimit > 0)
    query.append('usedAtEndLimit', usedAtEndLimit);

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
