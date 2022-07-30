import Translate from '../../Translator';
import commonTranslator from '../../../../../../tranlates/Common';

const Columns = [
  {
    name: commonTranslator.date,
    selector: row => row.date,
    grow: 1,
  },

  {
    name: Translate.amount,
    selector: row => row.amount,
    grow: 1,
  },
  {
    name: commonTranslator.desc,
    selector: row => row.lastTransaction,
    grow: 1,
  },
];
export default Columns;
