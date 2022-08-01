import Translate from '../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const Columns = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: Translate.tag,
    selector: row => row.tag,
    grow: 1,
  },
  {
    name: Translate.numberQuestion,
    selector: row => row.questionCount,
    grow: 1,
    sortable: true,
    sortFunction: (a, b) => {
      return a.questionCount - b.questionCount;
    },
  },
  {
    name: Translate.sumPayment,
    selector: row => row.sumPayment,
    grow: 1,
    sortable: true,
    sortFunction: (a, b) => {
      return a.sumPayment - b.sumPayment;
    },
  },
  {
    name: Translate.lastTransaction,
    selector: row => row.lastTransaction,
    grow: 1,
  },
];
export default Columns;
