import commonTranslator from '../../../../translator/Common';
import translator from '../Translate';

const columns = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.user,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.userNID,
    grow: 1,
  },
  {
    name: commonTranslator.phone,
    selector: row => row.userPhone,
    grow: 1,
  },
  {
    name: translator.amount,
    selector: row => row.amount,
    grow: 1,
    center: true,
  },
  {
    name: translator.accountMoney,
    selector: row => row.accountMoney,
    grow: 1,
    center: true,
  },
  {
    name: translator.useOffCode,
    selector: row => (row.useOff ? commonTranslator.yes : commonTranslator.no),
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.section,
    selector: row => row.section,
    grow: 1,
  },
  {
    name: commonTranslator.refId,
    selector: row => row.refId,
    grow: 1,
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

export default columns;
