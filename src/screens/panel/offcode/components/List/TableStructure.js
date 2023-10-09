import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';
import {formatPrice} from '../../../../../services/Utility';

const columns = [
  {
    name: translator.isPublic,
    selector: row =>
      row.isPublic ? commonTranslator.yes : commonTranslator.no,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.user,
    grow: 2,
    center: true,
  },
  {
    name: translator.amount,
    selector: row => row.amount,
    grow: 1,
    center: true,
  },
  {
    name: translator.type,
    selector: row => (row.type === 'value' ? 'مقداری' : 'درصدی'),
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.section,
    selector: row => row.sectionFa,
    grow: 1,
  },
  {
    name: translator.code,
    selector: row => row.code,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 2,
    wrap: true,
    sortable: true,
    sortFunction: (a, b) => {
      return a.createdAtTs - b.createdAtTs;
    },
  },
  {
    name: translator.expire,
    selector: row => row.expireAt,
    grow: 2,
    wrap: true,
    sortable: true,
    sortFunction: (a, b) => {
      return a.expireAtTs - b.expireAtTs;
    },
  },
  {
    name: translator.usedCount,
    selector: row => row.usedCount,
    minWidth: 80,
    maxWidth: 80,
    center: true,
  },
  {
    name: translator.useAt,
    selector: row => row.usedAt,
    grow: 2,
    wrap: true,
    sortable: true,
    sortFunction: (a, b) => {
      return a.usedAt - b.usedAt;
    },
  },
];

export const columnsForCopun = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.student.name,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.phone,
    selector: row => row.student.phone,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.student.NID,
    grow: 2,
    center: true,
  },
  {
    name: translator.amount,
    selector: row => row.discount,
    grow: 1,
    center: true,
  },
  {
    name: translator.code,
    selector: row => row.code,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 2,
    wrap: true,
    sortable: true,
    sortFunction: (a, b) => {
      return a.createdAtTs - b.createdAtTs;
    },
  },
];

export const columnsForCopunRev = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.firstname + ' ' + row.lastname,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.phone,
    selector: row => row.telephone,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.email,
    selector: row => row.email,
    grow: 2,
    center: true,
  },
  {
    name: 'مقدار خرید',
    selector: row => formatPrice(row.value),
    grow: 1,
    center: true,
  },
  {
    name: 'نتیجه',
    selector: row => row.result_api,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.created_at,
    grow: 2,
  },
];

export default columns;
