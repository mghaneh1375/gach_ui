const columns = [
  {
    name: 'نام ',
    selector: row => row.name,
    grow: 2,
    wrap: true,
  },
  {
    name: 'شهر',
    selector: row => row.city,
    grow: 1,
  },
  {
    name: 'استان',
    selector: row => row.state,
    grow: 1,
  },
  {
    name: 'مدرسه',
    selector: row => row.school,
    grow: 1,
  },
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
    name: 'رتبه در کشور',
    selector: row => row.rank,
    grow: 1,
  },
];

export default columns;
