import commonTranslator from '../../../../../translator/Common';
import Translator from '../../Translate';

const columns = [
  {
    name: Translator.sessionTitle,
    selector: row => row.title,
    grow: 3,
    center: true,
  },
  {
    name: Translator.attachesCount,
    selector: row => row.attachesCount,
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
    name: Translator.hasVideo,
    selector: row =>
      row.hasVideo ? commonTranslator.yes : commonTranslator.no,
    grow: 2,
    center: true,
  },
  {
    name: Translator.hasExam,
    selector: row => (row.hasExam ? commonTranslator.yes : commonTranslator.no),
    grow: 2,
    center: true,
  },
  {
    name: Translator.sessionDuration,
    selector: row => row.duration,
    grow: 2,
    center: true,
  },
  {
    name: Translator.price,
    selector: row => row.price,
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
    name: commonTranslator.visibility,
    selector: row =>
      row.visibility ? commonTranslator.show : commonTranslator.hide,
    grow: 1,
    center: true,
  },
];
export default columns;
