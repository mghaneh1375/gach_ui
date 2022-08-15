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
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
  },
  {
    name: 'رتبه در شهر',
    selector: row => row.cityRank,
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
  },
  {
    name: 'رتبه در استان',
    selector: row => row.stateRank,
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
  },
  {
    name: 'رتبه در کشور',
    selector: row => row.rank,
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
  },
];

export default columns;
