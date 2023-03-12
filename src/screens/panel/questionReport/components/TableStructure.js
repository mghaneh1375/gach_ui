import commonTranslator from '../../../../translator/Common';
import translator from '../Translate';

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
    name: translator.total,
    selector: row => row.reportsCount,
    grow: 2,
    center: true,
  },
  {
    name: translator.totalUnSeen,
    selector: row => row.unseenReportsCount,
    grow: 2,
    center: true,
  },
  {
    name: translator.canHasDesc,
    selector: row =>
      row.canHasDesc ? commonTranslator.yes : commonTranslator.no,
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
    name: translator.seenStatus,
    selector: row => (row.seen ? translator.seen : translator.unSeen),
    grow: 2,
    center: true,
  },
  {
    name: translator.questionCode,
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
