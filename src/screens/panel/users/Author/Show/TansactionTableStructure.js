import Translate from '../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.date,
    selector: row => row.payAt,
    grow: 1,
  },
  {
    name: Translate.amount,
    selector: row => row.pay,
    grow: 1,
  },
  {
    name: commonTranslator.desc,
    selector: row => row.description,
    grow: 1,
  },
];
export default columns;
