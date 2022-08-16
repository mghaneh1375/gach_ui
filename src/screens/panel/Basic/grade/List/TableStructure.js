import commonTranslator from '../../../../../tranlates/Common';
const columns = [
  {
    name: commonTranslator.level,
    selector: row => row.name,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.isOlympiad,
    selector: row => (row.isOlympiad ? 'بله' : 'خیر'),
    center: true,
    grow: 1,
  },
];

export default columns;
