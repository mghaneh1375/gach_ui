const columns = [
  {
    name: 'تراز کل',
    selector: row => row.taraz,
    grow: 1,
  },
  {
    name: 'رتبه در شهر',
    selector: row => row.cityRank,
    grow: 1,
  },
  {
    name: 'رتبه در استان',
    selector: row => row.stateRank,
    grow: 1,
  },
  {
    name: 'رتبه کل',
    selector: row => row.rank,
    grow: 1,
  },
];

export default columns;
