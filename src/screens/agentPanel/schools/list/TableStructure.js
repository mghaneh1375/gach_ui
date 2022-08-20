import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';

const commonCols = [
  {
    name: Translate.name,
    selector: row => row.schoolName,
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
    selector: row => row.managerName,
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
    minWidth: '80px',
    maxWidth: '80px',
    center: true,
  },
  {
    name: commonTranslator.sex,
    selector: row => row.schoolSexFa,
    minWidth: '50px',
    maxWidth: '50px',
    center: true,
  },
  {
    name: commonTranslator.grade,
    selector: row => row.kindSchoolFa,
    center: true,
    grow: 1,
  },
];

export const columnsForAgent = [...commonCols];

export const columnsForAdmin = [
  {
    name: Translate.agentName,
    selector: row => row.agent,
    grow: 1,
  },
  ...commonCols,
];
