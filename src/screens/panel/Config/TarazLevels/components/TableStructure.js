import translator from '../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const columns = [
  {
    name: translator.min,
    selector: row => row.min,
    center: true,
  },
  {
    name: translator.max,
    selector: row => row.max,
    center: true,
  },
  {
    name: translator.color,
    selector: row => row.color,
    center: true,
  },
  {
    name: commonTranslator.priority,
    selector: row => row.priority,
    center: true,
  },
];

export default columns;
