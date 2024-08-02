import commonTranslator from '../../../../translator/Common';
import {formatPrice} from '../../../../services/Utility';
import Translator from '../../../advisorPanel/Teach/Schedule/components/Translator';

const columns = [
  {
    name: Translator.teacher,
    selector: row => row.username,
    grow: 1,
  },
  {
    name: Translator.title,
    selector: row => row.title,
    grow: 1,
  },
  {
    name: Translator.start,
    selector: row => row.startAt,
    grow: 1,
  },
  {
    name: Translator.settledAt,
    selector: row => (row.settledAt ? row.settledAt : 'انجام نشده'),
    grow: 1,
  },
  {
    name: Translator.studentsCount,
    selector: row => row.studentsCount,
    grow: 1,
  },
  {
    name: Translator.teachMode,
    selector: row =>
      row.teachMode === 'private' ? Translator.private : Translator.semiPrivate,
    grow: 1,
  },
  {
    name: Translator.price,
    selector: row => formatPrice(row.price),
    grow: 1,
  },
  {
    name: Translator.iryscPercent,
    selector: row => row.iryscPercent,
    grow: 1,
  },
  {
    name: Translator.teacherShare,
    selector: row => formatPrice(row.teacherShare),
    grow: 1,
  },
];

export default columns;
