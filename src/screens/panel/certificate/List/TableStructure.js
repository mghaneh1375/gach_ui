import Translate from '../Translator';
import commonTranslator from '../../../../translator/Common';

const columns = [
  {
    name: Translate.certName,
    selector: row => row.title,
    grow: 3,
    center: true,
  },
  {
    name: Translate.createDate,
    selector: row => row.createDate,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.counter + ' ' + Translate.receiver,
    selector: row => row.count,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.visibility,
    selector: row => row.visibility,
    grow: 1,
    center: true,
  },
];
export default columns;
