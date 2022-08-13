const columns = [
  {
    name: 'نام',
    selector: row => row.label,
    grow: 4,
  },
  {
    name: 'رتبه',
    selector: row => row.rank,
    grow: 1,
    sortFunction: (a, b) => {
      return a.rank - b.rank;
    },
  },
  {
    name: 'تعداد شرکت کننده',
    selector: row => row.count,
    grow: 1,
    sortFunction: (a, b) => {
      return a.count - b.count;
    },
  },
  {
    name: 'میانگین تراز',
    selector: row => row.avg,
    grow: 1,
    sortFunction: (a, b) => {
      return a.avg - b.avg;
    },
  },
];

export default columns;
