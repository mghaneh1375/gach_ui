import commonTranslator from '../../../../../tranlates/Common';
const columns = [
  {
    name: commonTranslator.lesson,
    selector: row => row.name,
    center: true,
    grow: 1,
    maxWidth: '200px',
    minWidth: '200px',
  },
  {
    name: commonTranslator.level,
    selector: row => row.grade.name,
    center: true,
    grow: 1,
    maxWidth: '200px',
    minWidth: '200px',
  },
];

export default columns;
