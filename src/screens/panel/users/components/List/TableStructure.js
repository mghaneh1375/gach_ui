import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';

const columns = [
  {
    name: commonTranslator.nameAndLast,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    center: true,
    grow: 1,
  },
  {
    name: commonTranslator.sex,
    selector: row => row.sex,
    center: true,
    grow: 1,
  },
  {
    name: commonTranslator.mail,
    selector: row => row.mail,
    grow: 1,
  },
  {
    name: commonTranslator.phone,
    selector: row => row.phone,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.city,
    selector: row => row.city,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.school,
    selector: row => row.school,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.grade,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.branch,
    selector: row => row.branch,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.status,
    selector: row => (row.status === 'active' ? 'فعال' : 'غیرفعال'),
    grow: 1,
  },
];

export default columns;
