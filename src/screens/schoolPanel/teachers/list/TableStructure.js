import commonTranslator from '../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.name,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.tel,
    selector: row => row.tel,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.email,
    selector: row => row.email,
    grow: 1,
  },
];
export default columns;
