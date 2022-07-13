import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.mail,
    selector: row => row.mail,
    grow: 1,
  },
];

export default columns;
