import translator from '../translator';

const columns = [
  {
    name: translator.title,
    selector: row => row.name,
  },
  {
    name: translator.minPoint,
    selector: row => row.minPoint,
  },
  {
    name: translator.maxPoint,
    selector: row => row.maxPoint,
  },
  {
    name: translator.coin,
    selector: row => row.coin,
  },
];

export default columns;
