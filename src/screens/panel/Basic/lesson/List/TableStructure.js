import commonTranslator from '../../../../../tranlates/Common';
const columns = [
  {
    name: commonTranslator.lesson,
    selector: row => row.name,
    center: true,
    grow: 1,
  },
  {
    name: commonTranslator.level,
    selector: row => row.grade.name,
    center: true,
    grow: 1,
  },
];

export default columns;
