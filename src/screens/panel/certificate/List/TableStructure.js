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
    selector: row => row.createdAt,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.counter + ' ' + Translate.receiver,
    selector: row => row.studentsCount,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.visibility,
    selector: row =>
      row.visibility ? commonTranslator.show : commonTranslator.hide,
    grow: 1,
    center: true,
  },
];
export default columns;
