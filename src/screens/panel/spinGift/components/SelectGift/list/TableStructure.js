import Translate from '../../../Translate';
import commonTranslator from '../../../../../../translator/Common';

const columns = [
  {
    name: Translate.giftType,
    selector: row => row.typeFa,
    grow: 7,
  },
  {
    name: Translate.amount,
    selector: row => row.amount,
    grow: 0.5,
  },
  {
    name: commonTranslator.counter,
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
    name: Translate.reminder,
    selector: row => row.reminder,
    grow: 1,
  },
];
export default columns;
