const columns = [
  {
    name: 'نام ',
    selector: row => row.name,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'شهر',
    selector: row => row.city,
    grow: 1,
    size: 10,
  },
  {
    name: 'استان',
    selector: row => row.state,
    grow: 1,
    fontSize: 10,
  },
  {
    name: 'مدرسه',
    selector: row => row.school,
    grow: 1,
    fontSize: 10,
  },
  {
    name: 'تراز کل',
    selector: row => row.taraz,
    grow: 1,
    fontSize: 10,
  },
  {
    name: 'رتبه در شهر',
    selector: row => row.cityRank,
    grow: 1,
    fontSize: 10,
  },
  {
    name: 'رتبه در استان',
    selector: row => row.stateRank,
    grow: 1,
    font: 10,
  },
  {
    name: 'رتبه در کشور',
    selector: row => row.rank,
    grow: 1,
    fontSize: 10,
  },
];

export default columns;
