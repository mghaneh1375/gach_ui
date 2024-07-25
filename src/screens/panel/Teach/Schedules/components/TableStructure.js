import {formatPrice} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';
import Translator from '../../../../advisorPanel/Teach/Schedule/components/Translator';

const TableStructure = [
  {
    name: Translator.teacher,
    selector: row => row.user,
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
    name: 'امتیاز',
    selector: row => (row.rate === undefined ? 'امتیاز داده نشده' : row.rate),
    grow: 1,
    center: true,
  },
  {
    name: 'تاریخ امتیاز',
    selector: row => (row.rate === undefined ? 'امتیاز داده نشده' : row.rateAt),
    grow: 2,
  },
  {
    name: 'تاریخ ثبت نام',
    selector: row => row.createdAt,
    grow: 2,
  },
];

export default TableStructure;
