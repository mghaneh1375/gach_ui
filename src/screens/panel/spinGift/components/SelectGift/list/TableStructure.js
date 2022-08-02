import Translate from '../../../Translate';
import commonTranslator from '../../../../../../tranlates/Common';

const columns = [
  {
    name: Translate.typeGift,
    selector: row => row.typeFa,
    grow: 4,
  },
  {
    name: Translate.valueGift,
    selector: row => row.count,
    grow: 0.5,
  },
  {
    name: commonTranslator.priority,
    selector: row => row.priority,
    grow: 1,
  },
  {
    name: Translate.probability,
    selector: row => row.prob,
    grow: 1,
  },
  {
    name: Translate.siteApp,
    selector: row => row.isForSiteFa,
    grow: 1,
  },
  {
    name: commonTranslator.used,
    selector: row => row.used,
    grow: 1,
  },
];
export default columns;