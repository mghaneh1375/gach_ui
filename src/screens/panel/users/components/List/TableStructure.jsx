import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.name,
    grow: 1,
  },

  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    grow: 1,
  },

  {
    name: commonTranslator.mail,
    selector: row => row.mail,
    grow: 1,
  },

  {
    name: commonTranslator.phone,
    selector: row => row.phone,
    grow: 1,
  },
  {
    name: commonTranslator.status,
    selector: row => row.status,
    grow: 1,
  },
];

export default columns;
