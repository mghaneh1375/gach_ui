import translator from '../../Translator';
import commonTranslator from '../../../../../../tranlates/Common';

const columns = [
  {
    name: translator.name,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.city,
    selector: row => row.city,
    grow: 1,
  },
  {
    name: translator.kind,
    selector: row => row.kindStr,
    grow: 1,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.gradeStr,
    grow: 1,
  },
  {
    name: commonTranslator.address,
    selector: row => row.address,
    grow: 4,
  },
];

export default columns;
