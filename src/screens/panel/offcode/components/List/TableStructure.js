import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const columns = [
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
