const columns = [
  {
    name: 'نام مبحث ',
    selector: row => row.name,
    grow: 1,
  },
  {
    name: 'تعداد سوال',
    selector: row => row.total,
    grow: 0.5,
  },
  {
    name: 'درست',
    selector: row => row.corrects,
    grow: 0.5,
  },
  {
    name: 'نادرست',
    selector: row => row.incorrects,
    grow: 0.5,
  },
  {
    name: 'نزده',
    selector: row => row.whites,
    grow: 0.5,
  },
  {
    name: 'درصد',
    selector: row => row.percent,
    grow: 0.5,
  },
  {
    name: 'نمره تراز',
    selector: row => row.taraz,
    grow: 1,
  },
];

export default columns;
