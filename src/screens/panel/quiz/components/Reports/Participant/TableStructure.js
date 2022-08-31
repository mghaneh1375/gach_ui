const columns = [
  {
    name: 'نام',
    selector: row => row.name,
    grow: 4,
    center: true,
  },
  {
    name: 'زمان ورود',
    selector: row => row.startAt,
    grow: 2,
    center: true,
  },
  {
    name: 'زمان خروج',
    selector: row => row.finishAt,
    grow: 2,
    center: true,
  },
];

export default columns;
