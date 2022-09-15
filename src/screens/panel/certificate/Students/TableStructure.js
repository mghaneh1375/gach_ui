import translator from './../Translator';
import commonTranslator from '../../../../translator/Common';

const columns = [
  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    grow: 2,
    center: true,
  },
  {
    name: translator.downloadAt,
    selector: row => row.downloadAt,
    grow: 1,
    center: true,
  },
];
export default columns;
