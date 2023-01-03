import commonTranslator from '../../../../../translator/Common';
import Translator from '../../Translate';

const columns = [
  {
    name: Translator.title,
    selector: row => row.title,
    grow: 3,
    center: true,
  },
  {
    name: Translator.usersCount,
    selector: row => row.usersCount,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 2,
    center: true,
  },
];
export default columns;
