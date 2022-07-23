import Translate from '../../../Translate';
import commonTranslator from '../../../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.name,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: Translate.lessonName,
    selector: row => row.lesson.name,
    grow: 1,
  },
  {
    name: Translate.gradeName,
    selector: row => row.grade.name,
    grow: 1,
  },
  {
    name: Translate.easyPrice,
    selector: row => row.easyPrice,
    grow: 1,
  },
  {
    name: Translate.midPrice,
    selector: row => row.midPrice,
    grow: 1,
  },
  {
    name: Translate.hardPrice,
    selector: row => row.hardPrice,
    grow: 1,
  },
];

export default columns;
