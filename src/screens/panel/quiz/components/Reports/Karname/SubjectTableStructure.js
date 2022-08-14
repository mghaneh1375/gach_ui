const columns = [
  {
    name: 'نام مبحث ',
    selector: row => row.name,
    grow: 3,
  },
  {
    name: 'تعداد سوال',
    selector: row => row.total,
    grow: 1,
  },
  {
    name: 'درست',
    selector: row => row.corrects,
    grow: 1,
  },
  {
    name: 'نادرست',
    selector: row => row.incorrects,
    grow: 1,
  },
  {
    name: 'نزده',
    selector: row => row.whites,
    grow: 1,
  },
  {
    name: 'درصد',
    selector: row => row.percent,
    grow: 1,
  },
  {
    name: 'نمره تراز',
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
    selector: row => row.countryRank,
    grow: 1,
  },
];

export default columns;
