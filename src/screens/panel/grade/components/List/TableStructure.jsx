import commonTranslator from '../../../../../tranlates/Common';
const columns = [
  {
    name: commonTranslator.title,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.isOlympiad,
    selector: row => row.isOlympiad,
    grow: 1,
  },
];

export default columns;
