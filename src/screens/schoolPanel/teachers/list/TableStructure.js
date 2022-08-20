import commonTranslator from '../../../../tranlates/Common';

const columns = [
  {
    name: commonTranslator.name + ' و ' + commonTranslator.lastname,
    selector: row => row.student.name,
    grow: 1,
  },
  {
    name: commonTranslator.NID,
    selector: row => row.student.NID,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.tel,
    selector: row => row.student.phone,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.email,
    selector: row => row.student.mail,
    grow: 1,
  },
];
export default columns;
