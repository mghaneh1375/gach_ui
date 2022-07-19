import commonTranslator from '../../../../../tranlates/Common';
const columns = [
  {
    name: commonTranslator.title,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.status,
    selector: row => row.status,
    grow: 1,
  },
];

export default columns;
