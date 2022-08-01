import Translate from '../../../Translate';
import commonTranslator from '../../../../../../tranlates/Common';

const columns = [
  {
    name: Translate.typeGift,
    selector: row => row.typeGift,
    grow: 1,
  },

  {
    name: Translate.valueGift,
    selector: row => row.howMany,
    grow: 1,
  },

  {
    name: commonTranslator.howMany,
    selector: row => row.mail,
    grow: 1,
  },

  {
    name: commonTranslator.priority,
    selector: row => row.priority,
    grow: 1,
  },
  {
    name: Translate.probability,
    selector: row => row.probability,
    grow: 1,
  },
  {
    name: commonTranslator.used,
    selector: row => row.useable,
    grow: 1,
  },
];
export default columns;
