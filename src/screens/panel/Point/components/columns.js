import translator from '../translator';

const columns = [
  {
    name: translator.metric,
    selector: row => row.actionFa,
  },
  {
    name: translator.point,
    selector: row => row.point,
  },
];

export default columns;
