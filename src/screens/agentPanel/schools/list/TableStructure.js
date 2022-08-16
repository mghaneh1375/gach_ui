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
    center: true,
  },
  {
    name: Translate.manager,
    selector: row => row.ManagerName,
    grow: 1,
  },
  {
    name: Translate.phone,
    selector: row => row.phone,
    grow: 1,
    center: true,
  },
  {
    name: Translate.number,
    selector: row => row.studentsNo,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.sex,
    selector: row => row.schoolSexFa,
    grow: 1,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.kindSchoolFa,
    center: true,
    grow: 1,
  },
];
export default columns;
