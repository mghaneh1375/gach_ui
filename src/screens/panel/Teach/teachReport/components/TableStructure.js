import translator from '../../translate';
import commonTranslator from '@/translator/common';
const columns = [
  {
    name: translator.sendFrom,
    selector: row => (row.sendFrom === 'student' ? 'دانش آموز' : 'دبیر'),
    grow: 2,
    center: true,
  },
  {
    name: translator.student,
    selector: row => row.student,
    grow: 2,
    center: true,
  },
  {
    name: translator.teacher,
    selector: row => row.teacher,
    grow: 2,
    center: true,
  },
  {
    name: translator.startAt,
    selector: row => row.startAt,
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
