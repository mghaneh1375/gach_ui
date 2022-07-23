import commonTranslator from '../../../../../tranlates/Common';
import Translate from '../../Translate';
const columns = [
  {
    name: Translate.lessonName,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: Translate.level,
    selector: row => row.grade.name,
    grow: 1,
  },
];

export default columns;
