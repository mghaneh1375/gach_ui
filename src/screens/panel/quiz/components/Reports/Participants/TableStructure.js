const columns = [
  {
    name: 'نام',
    selector: row => row.label,
    grow: 4,
    center: true,
  },
  {
    name: 'رتبه',
    center: true,
    selector: row => row.rank,
    grow: 1,
    sortFunction: (a, b) => {
      return a.rank - b.rank;
    },
  },
  {
    name: 'تعداد شرکت کننده',
    center: true,
    selector: row => row.count,
    grow: 1,
    sortFunction: (a, b) => {
      return a.count - b.count;
    },
  },
  {
    name: 'میانگین تراز',
    selector: row => row.avg,
    center: true,
    grow: 1,
    sortFunction: (a, b) => {
      return a.avg - b.avg;
    },
  },
];

export default columns;
