import Translate from '../Translator';
import commonTranslator from '../../../../translator/Common';

const columns = [
  // {
  //   name: commonTranslator.name,
  //   selector: row => row.paramName,
  //   grow: 1,
  //   center: true,
  // },
  {
    name: Translate.param,
    selector: row => row.paramName,
    grow: 1,
    center: true,
  },
  {
    name: Translate.typeOfFont,
    selector: row => (row.isBold === true ? 'بله' : 'خیر'),
    grow: 1,
    center: true,
  },
  {
    name: Translate.horizontalDistance,
    selector: row => row.qrHorizontalDistance,
    grow: 1,
    center: true,
  },
  {
    name: Translate.verticalDistance,
    selector: row => row.fromTopScreen,
    grow: 1,
    center: true,
  },
  {
    name: Translate.rightDistance,
    selector: row => row.centerOffset,
    grow: 1,
    center: true,
  },
];
export default columns;
