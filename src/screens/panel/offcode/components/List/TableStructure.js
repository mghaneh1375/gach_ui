import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

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

export default columns;
