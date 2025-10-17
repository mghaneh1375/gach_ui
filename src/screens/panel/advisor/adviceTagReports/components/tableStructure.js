import commonTranslator from '@/translator/common';
import {Translate} from '../../translate';
const columns = [
  {
    name: commonTranslator.title,
    selector: row => row.label,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.priority,
    selector: row => row.priority,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.visibility,
    selector: row => (row.visibility ? 'فعال' : 'غیرفعال'),
    grow: 2,
    center: true,
  },
  {
    name: Translate.totalUnSeen,
    selector: row => row.unseenReportsCount,
    grow: 2,
    center: true,
  },
  {
    name: Translate.mode,
    selector: row => (row.mode === 'USER' ? 'دانش آموز' : 'دبیر'),
    grow: 2,
    center: true,
  },
];
export const reportColumns = [
  {
    name: commonTranslator.name,
    selector: row => row.name,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    grow: 2,
    center: true,
  },
  {
    name: Translate.seenStatus,
    selector: row => (row.seen ? Translate.seen : Translate.unSeen),
    grow: 2,
    center: true,
  },
  {
    name: Translate.questionCode,
    selector: row => row.questionCode,
    grow: 2,
    center: true,
  },
  {
    name: commonTranslator.desc,
    selector: row => row.description,
    grow: 7,
    center: true,
  },
  {
    name: commonTranslator.createdAt,
    selector: row => row.createdAt,
    grow: 4,
    center: true,
  },
];
export default columns;
