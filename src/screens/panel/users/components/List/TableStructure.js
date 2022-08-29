import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';

const columns = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.name,
    grow: 1,
  },

  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    center: true,
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
    center: true,
  },
  {
    name: commonTranslator.status,
    selector: row => (row.status === 'active' ? 'فعال' : 'غیرفعال'),
    grow: 1,
  },
];

export default columns;
