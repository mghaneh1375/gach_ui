import {formatPrice} from '../../../../../services/Utility';
import Translator from './Translator';
import commonTranslator from '../../../../../translator/Common';

export const studentsColumns = [
  {
    name: commonTranslator.name,
    selector: row => row.student.name,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.city,
    selector: row => row.student.city,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.school,
    selector: row => row.student.school,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.student.grade,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.branch,
    selector: row => row.student.branches,
    grow: 2,
    center: true,
  },
  {
    name: Translator.stdTeachRate,
    selector: row => row.student.teachRate,
    grow: 2,
    center: true,
  },
  {
    name: Translator.teacherToStdRate,
    selector: row => row.teacherToStdRate,
    grow: 2,
    center: true,
  },
  {
    name: Translator.teacherToStdRateAt,
    selector: row => row.teacherToStdRateAt,
    grow: 3,
    center: true,
  },
  {
    name: 'تاریخ ثبت نام',
    selector: row => row.createdAt,
    grow: 3,
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
    selector: row =>
      row.startAt ? row.startAt : row.startDate + ' تا ' + row.endDate,
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
  {
    name: Translator.sessionsCount,
    selector: row => (row.sessionsCount ? row.sessionsCount : 1),
    grow: 1,
  },
];

export default columns;
