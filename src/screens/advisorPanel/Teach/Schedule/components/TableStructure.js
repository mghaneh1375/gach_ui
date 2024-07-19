import {formatPrice} from '../../../../../services/Utility';
import Translator from './Translator';
import commonTranslator from '../../../../../translator/Common';

export const studentsColumns = [
  {
    name: Translator.title,
    selector: row => row.title,
    grow: 1,
  },
];

const columns = [
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
    name: Translator.duration,
    selector: row => row.length,
    grow: 1,
  },
  {
    name: Translator.price,
    selector: row => formatPrice(row.price),
    grow: 1,
  },
  {
    name: Translator.teachMode,
    selector: row =>
      row.teachMode === 'private' ? Translator.private : Translator.semiPrivate,
    grow: 1,
  },
  {
    name: Translator.needRegistryConfirmation,
    selector: row =>
      row.needRegistryConfirmation ? commonTranslator.yes : commonTranslator.no,
    grow: 1,
  },
  {
    name: Translator.studentsCount,
    selector: row => row.studentsCount,
    grow: 1,
  },
  {
    name: Translator.requestsCount,
    selector: row => row.requestsCount,
    grow: 1,
  },
  {
    name: commonTranslator.visibility,
    selector: row => (row.visibility ? 'فعال' : 'غیرفعال'),
    grow: 1,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 1,
  },
];

export default columns;
