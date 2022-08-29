import translator from '../../Translator';
import commonTranslator from '../../../../../../translator/Common';

const columns = [
  {
    name: translator.name,
    selector: row => row.name,
    grow: 1,
  },
  {
    name: commonTranslator.city,
    selector: row => row.city.name,
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
    name: translator.user,
    selector: row => row.manager,
    grow: 1,
    center: true,
  },
  {
    name: translator.userPhone,
    selector: row => row.managerPhone,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.address,
    selector: row => row.address,
    grow: 4,
  },
];

export default columns;
