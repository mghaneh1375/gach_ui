import commonTranslator from '../../../../translator/Common';

const columns = [
  {
    name: commonTranslator.name + ' و ' + commonTranslator.lastname,
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
    selector: row => row.phone,
    grow: 1,
    center: true,
  },
  {
    name: commonTranslator.email,
    selector: row => row.mail,
    grow: 1,
  },
];
export default columns;
