const columns = [
  {
    name: 'نام درس ',
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
    grow: 0.5,
  },
];

export default columns;
