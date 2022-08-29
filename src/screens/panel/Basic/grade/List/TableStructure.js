import commonTranslator from '../../../../../translator/Common';
const columns = [
  {
    name: commonTranslator.level,
    selector: row => row.name,
    center: true,
    grow: 1,
    maxWidth: '200px',
    minWidth: '200px',
  },
  {
    name: commonTranslator.isOlympiad,
    selector: row => (row.isOlympiad ? 'بله' : 'خیر'),
    center: true,
    grow: 1,
    maxWidth: '200px',
    minWidth: '200px',
  },
];

export default columns;
