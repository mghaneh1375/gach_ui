import Translate from '../../../Translate';
import commonTranslator from '../../../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.name,
    selector: row => row.name,
    grow: 1,
    center: true,
  },
  {
    name: Translate.code,
    selector: row => row.code,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.lesson,
    selector: row => row.lesson.name,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.grade.name,
    grow: 1,
    center: true,
  },
  {
    name: Translate.easyPrice,
    selector: row => row.easyPrice,
    grow: 1,
    center: true,
  },
  {
    name: Translate.midPrice,
    selector: row => row.midPrice,
    grow: 1,
    center: true,
  },
  {
    name: Translate.hardPrice,
    selector: row => row.hardPrice,
    grow: 1,
    center: true,
  },
  {
    name: Translate.schoolEasyPrice,
    selector: row => row.schoolEasyPrice,
    grow: 1,
    center: true,
  },
  {
    name: Translate.schoolMidPrice,
    selector: row => row.schoolMidPrice,
    grow: 1,
    center: true,
  },
  {
    name: Translate.schoolHardPrice,
    selector: row => row.schoolHardPrice,
    grow: 1,
    center: true,
  },
];

export default columns;
