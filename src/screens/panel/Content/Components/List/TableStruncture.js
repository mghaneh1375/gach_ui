import {formatPrice} from '../../../../../services/utility';
import commonTranslator from '@/translator/common';
import Translator from '../../translate';
const columns = [
  {
    name: Translator.title,
    selector: row => row.title,
    grow: 3,
    center: true,
  },
  {
    name: Translator.price,
    selector: row => formatPrice(row.price),
    grow: 2,
    center: true,
  },
  {
    name: Translator.teacher,
    selector: row => row.teacher.join(' '),
    grow: 2,
    center: true,
  },
  {
    name: Translator.priority,
    selector: row => row.priority,
    grow: 2,
    center: true,
  },
  {
    name: Translator.sessionsCount,
    selector: row => row.sessionsCount,
    grow: 2,
    center: true,
  },
  {
    name: Translator.buyers,
    selector: row => row.buyers,
    grow: 2,
    center: true,
  },
  {
    name: Translator.hasCert,
    selector: row => (row.hasCert ? commonTranslator.yes : commonTranslator.no),
    grow: 2,
    center: true,
  },
  {
    name: Translator.hasFinalExam,
    selector: row =>
      row.hasFinalExam ? commonTranslator.yes : commonTranslator.no,
    grow: 2,
    center: true,
  },
  {
    name: Translator.duration,
    selector: row => row.duration,
    grow: 2,
    center: true,
  },
  {
    name: Translator.level,
    selector: row => row.level,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.visibility,
    selector: row =>
      row.visibility ? commonTranslator.show : commonTranslator.hide,
    grow: 1,
    center: true,
  },
];
export default columns;
