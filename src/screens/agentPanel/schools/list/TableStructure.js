import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';

const columns = [
  {
    name: Translate.name,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.NID,
    grow: 1,
  },
  {
    name: Translate.manager,
    selector: row => row.manager,
    grow: 1,
  },
  {
    name: Translate.phone,
    selector: row => row.phone,
    grow: 1,
  },
  {
    name: Translate.number,
    selector: row => row.number,
    grow: 1,
  },
  {
    name: commonTranslator.sex,
    selector: row => row.schoolSex,
    grow: 1,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.kindSchool,
    grow: 1,
  },
];
export default columns;
