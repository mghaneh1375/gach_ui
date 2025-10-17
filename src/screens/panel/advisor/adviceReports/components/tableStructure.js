import {Translate} from '../../translate';
import commonTranslator from '@/translator/common';
const columns = [
  {
    name: Translate.sendFrom,
    selector: row =>
      !row || !row.sendFrom
        ? ''
        : row.sendFrom === 'student'
        ? 'دانش آموز'
        : 'دبیر',
    grow: 2,
    center: true,
  },
  {
    name: Translate.reporter,
    selector: row => row.reporter.firstname + ' ' + row.reporter.lastname,
    grow: 2,
    center: true,
  },
  {
    name: Translate.reportAbout,
    selector: row => row.reportAbout.firstname + ' ' + row.reportAbout.lastname,
    grow: 2,
    center: true,
  },
  {
    name: Translate.seenStatus,
    selector: row => (row.seen ? 'مشاهده شده' : 'مشاهده نشده'),
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 2,
    center: true,
  },
];
export default columns;
