const columns = [
  {
    name: 'نام مبحث',
    selector: row => row.name,
    grow: 4,
  },
  {
    name: 'رتبه در مدرسه',
    selector: row => row.schoolRank,
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
